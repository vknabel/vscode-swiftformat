"use strict";

import * as vscode from "vscode";
import { SwiftFormatEditProvider } from "./SwiftFormatEditProvider";
import Current from "./Current";
import { promisify } from "util";
import * as path from "path";
import { exec } from "child_process";

export function activate(context: vscode.ExtensionContext) {
  if (Current.config.isEnabled() === false) {
    return;
  }

  buildSwiftformatIfNeeded().then(() => {
    const swiftSelector: vscode.DocumentSelector = {
      scheme: "file",
      language: "swift",
    };
    const editProvider = new SwiftFormatEditProvider();
    vscode.languages.registerDocumentRangeFormattingEditProvider(
      swiftSelector,
      editProvider,
    );
    vscode.languages.registerDocumentFormattingEditProvider(
      swiftSelector,
      editProvider,
    );
  });
}

async function buildSwiftformatIfNeeded() {
  const manifests = await vscode.workspace.findFiles(
    "**/Package.swift",
    "**/.build/**",
    2,
  );
  if (manifests.length == 0) {
    return;
  }
  const buildOperations = manifests.map((manifest) => {
    const manifestPath = manifest.fsPath;
    const manifestDir = path.dirname(manifestPath);
    const executable = vscode.workspace.getConfiguration().get("swiftformat.path", undefined);
    return promisify(exec)(
      executable
        ? `${executable} --version`
        : "swift run -c release swiftformat --version",
      {
        cwd: manifestDir
      }
    );
  });
  try {
    await vscode.window.withProgress(
      {
        location: vscode.ProgressLocation.Window,
        title: "Preparing swiftformat",
      },
      async () => {
        await Promise.all(buildOperations);
      },
    );
  } catch (error) {
    console.log(error);
  }
}
