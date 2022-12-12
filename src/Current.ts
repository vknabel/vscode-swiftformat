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
    onlyEnableOnSwiftPMProjects(): boolean;
    onlyEnableWithConfig(): boolean;
    swiftFormatPath(document: vscode.TextDocument): string[] | null;
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
      onlyEnableOnSwiftPMProjects: () =>
        vscode.workspace
          .getConfiguration()
          .get("swiftformat.onlyEnableOnSwiftPMProjects", false),
      onlyEnableWithConfig: () =>
        vscode.workspace
          .getConfiguration()
          .get("swiftformat.onlyEnableWithConfig", false),

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
            return [absolutePath(fullPath)];
          }
        }
        if (
          vscode.workspace
            .getConfiguration()
            .get("swiftformat.onlyEnableOnSwiftPMProjects", false)
        ) {
          return null;
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

const fallbackGlobalSwiftFormatPath = (): string[] => {
  const defaultPath = ["/usr/bin/env", "swiftformat"];
  const path = vscode.workspace
    .getConfiguration()
    .get("swiftformat.path", defaultPath);
  if (typeof path === "string") {
    return [absolutePath(path)];
  } else if (Array.isArray(path) && path.length > 0) {
    return [absolutePath(path[0]), ...path.slice(1)];
  } else {
    return defaultPath;
  }
};

const Current = prodEnvironment();
export default Current as Current;
