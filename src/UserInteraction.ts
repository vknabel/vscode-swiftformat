import * as vscode from "vscode";
import Current from "./Current";

enum FormatErrorInteraction {
  configure = "Configure",
  reset = "Reset"
}

enum UnknownErrorInteraction {
  reportIssue = "Report issue"
}

export async function handleFormatError(
  error: any,
  document: vscode.TextDocument
) {
  if (error.code === "ENOENT") {
    const selection = await Current.editor.showErrorMessage(
      `Could not find SwiftFormat: ${Current.config.swiftFormatPath(document)}`,
      FormatErrorInteraction.reset,
      FormatErrorInteraction.configure
    );
    switch (selection) {
      case FormatErrorInteraction.reset:
        await Current.config.resetSwiftFormatPath();
        break;
      case FormatErrorInteraction.configure:
        await Current.config.configureSwiftFormatPath();
        break;
    }
  } else if (error.status === 70) {
    await Current.editor.showErrorMessage(
      `SwiftFormat failed. ${error.stderr || ""}`
    );
  } else {
    const unknownErrorSelection = await Current.editor.showErrorMessage(
      `An unknown error occurred. ${error.message || ""}`,
      UnknownErrorInteraction.reportIssue
    );
    if (unknownErrorSelection === UnknownErrorInteraction.reportIssue) {
      await Current.editor.reportIssueForError(error);
    }
  }
}
