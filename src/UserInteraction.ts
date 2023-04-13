import * as vscode from "vscode";
import Current from "./Current";

enum FormatErrorInteraction {
  configure = "Configure",
  reset = "Reset",
  howTo = "How?"
}

enum UnknownErrorInteraction {
  reportIssue = "Report issue"
}

export async function handleFormatError(
  error: any,
  document: vscode.TextDocument
) {
  function matches(...codeOrStatus: Array<number | string>) {
    return codeOrStatus.some(c => c === error.code || c === error.status);
  }
  if (matches("ENOBUFS", "EPIPE")) {
    return;
  } else if (matches("ENOENT", "EACCES", 127)) {
    const selection = await Current.editor.showErrorMessage(
      `Could not find SwiftFormat: ${Current.config
        .swiftFormatPath(document)
        ?.join(" ")}.\nEnsure it is installed and in your PATH.`,
      FormatErrorInteraction.reset,
      FormatErrorInteraction.configure,
      FormatErrorInteraction.howTo
    );
    switch (selection) {
      case FormatErrorInteraction.reset:
        Current.config.resetSwiftFormatPath();
        break;
      case FormatErrorInteraction.configure:
        Current.config.configureSwiftFormatPath();
        break;
      case FormatErrorInteraction.howTo:
        await Current.editor.openURL(
          "https://github.com/nicklockwood/SwiftFormat#command-line-tool"
        );
        break;
    }
  } else if (matches(70)) {
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
