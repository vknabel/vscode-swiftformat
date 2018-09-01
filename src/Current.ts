export interface Current {
  platform: {
    isLinux: boolean;
  };
  editor: {
    openURL(url: string): Thenable<void>;
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

    swiftFormatPath(): string;
    resetSwiftFormatPath(): void;
    configureSwiftFormatPath(): void;

    formatOptions(): string[];
  };
}

import * as vscode from "vscode";
export function prodEnvironment(): Current {
  return {
    platform: {
      isLinux: process.platform === "linux"
    },
    editor: {
      async openURL(url: string) {
        await vscode.commands.executeCommand(
          "vscode.open",
          vscode.Uri.parse(url)
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
        vscode.workspace.getConfiguration().get("swiftformat.enable"),

      swiftFormatPath: () =>
        vscode.workspace.getConfiguration().get("swiftformat.path"),
      resetSwiftFormatPath: () =>
        vscode.workspace
          .getConfiguration()
          .update("swiftformat.path", undefined),
      configureSwiftFormatPath: () =>
        vscode.commands.executeCommand("workbench.action.openSettings"),

      formatOptions: () =>
        vscode.workspace.getConfiguration().get("swiftformat.options")
    }
  };
}

export default prodEnvironment() as Current;
