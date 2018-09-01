"use strict";

import * as vscode from "vscode";
import { SwiftFormatEditProvider } from "./SwiftFormatEditProvider";
import Current from "./Current";
import { showMissingLinuxSupportWarning } from "./UserInteraction";

export function activate(context: vscode.ExtensionContext) {
  if (Current.config.isEnabled() === false) {
    return;
  } else if (Current.platform.isLinux) {
    showMissingLinuxSupportWarning();
    return;
  }

  const swiftSelector: vscode.DocumentSelector = {
    scheme: "file",
    language: "swift"
  };
  const editProvider = new SwiftFormatEditProvider();
  vscode.languages.registerDocumentRangeFormattingEditProvider(
    swiftSelector,
    editProvider
  );
  vscode.languages.registerDocumentFormattingEditProvider(
    swiftSelector,
    editProvider
  );
}
