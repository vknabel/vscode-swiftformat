export interface Current {
  editor: {
    openURL(url: string): Thenable<void>;
    reportIssueForError(
      error: Partial<Error & { code: number }>
    ): Thenable<void>;
    showErrorMessage<T extends string>(
      message: string,
      ...actions: T[]
    ): Thenable<T | undefined>;
    showWarningMessage<T extends string>(
      message: string,
      ...actions: T[]
    ): Thenable<T | undefined>;
  };
  config: {
    isEnabled(): boolean;

    swiftFormatPath(document: vscode.TextDocument): string;
    resetSwiftFormatPath(): void;
    configureSwiftFormatPath(): void;
    formatOptions(): string[];
    formatConfigSearchPaths(): string[];
  };
}

import * as vscode from "vscode";
import { url } from "./UrlLiteral";
import { absolutePath } from "./AbsolutePath";
import { existsSync } from "fs";
import { join } from "path";

export function prodEnvironment(): Current {
  return {
    editor: {
      async openURL(url: string) {
        await vscode.commands.executeCommand(
          "vscode.open",
          vscode.Uri.parse(url)
        );
      },
      async reportIssueForError(error) {
        const title = `Report ${error.code || ""} ${error.message ||
          ""}`.replace(/\\n/, " ");
        const body = "`" + (error.stack || JSON.stringify(error)) + "`";
        await Current.editor.openURL(
          url`https://github.com/vknabel/vscode-swiftformat/issues/new?title=${title}&body=${body}`
        );
      },
      showErrorMessage: <T extends string>(message: string, ...actions: T[]) =>
        vscode.window.showErrorMessage(message, ...actions) as Thenable<
          T | undefined
        >,
      showWarningMessage: <T extends string>(
        message: string,
        ...actions: T[]
      ) =>
        vscode.window.showWarningMessage(message, ...actions) as Thenable<
          T | undefined
        >
    },
    config: {
      isEnabled: () =>
        vscode.workspace.getConfiguration().get("swiftformat.enable", true),
      swiftFormatPath: (document: vscode.TextDocument) => {
        // Support running from Swift PM projects
        const possibleLocalPaths = [
          ".build/release/swiftformat",
          ".build/debug/swiftformat"
        ];
        for (const path of possibleLocalPaths) {
          // Grab the project root from the local workspace
          const workspace = vscode.workspace.getWorkspaceFolder(document.uri);
          if (workspace == null) {
            continue;
          }
          const fullPath = join(workspace.uri.fsPath, path);

          if (existsSync(fullPath)) {
            return absolutePath(fullPath);
          }
        }
        // Fall back to global defaults found in settings
        return fallbackGlobalSwiftFormatPath();
      },
      resetSwiftFormatPath: () =>
        vscode.workspace
          .getConfiguration()
          .update("swiftformat.path", undefined),
      configureSwiftFormatPath: () =>
        vscode.commands.executeCommand("workbench.action.openSettings"),
      formatOptions: () =>
        vscode.workspace.getConfiguration().get("swiftformat.options", []),
      formatConfigSearchPaths: () =>
        vscode.workspace
          .getConfiguration()
          .get("swiftformat.configSearchPaths", [".swiftformat"])
          .map(absolutePath)
    }
  };
}

const fallbackGlobalSwiftFormatPath = () =>
  absolutePath(
    vscode.workspace
      .getConfiguration()
      .get("swiftformat.path", "/usr/local/bin/swiftformat")
  );

const Current = prodEnvironment();
export default Current as Current;
