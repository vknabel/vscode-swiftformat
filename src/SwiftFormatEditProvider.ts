import * as vscode from "vscode";
import * as childProcess from "child_process";
import Current from "./Current";
import { handleFormatError } from "./UserInteraction";

const wholeDocumentRange = new vscode.Range(
  0,
  0,
  Number.MAX_SAFE_INTEGER,
  Number.MAX_SAFE_INTEGER
);
function format(
  document: vscode.TextDocument,
  options: string[] = [],
  range: vscode.Range = wholeDocumentRange
) {
  try {
    const input = document.getText(range);
    const newContents = childProcess
      .execFileSync(
        Current.config.swiftFormatPath(),
        [...Current.config.formatOptions(), ...options],
        {
          encoding: "utf8",
          input
        }
      )
      .slice(0, -1);
    return newContents !== document.getText(range)
      ? [vscode.TextEdit.replace(document.validateRange(range), newContents)]
      : [];
  } catch (error) {
    handleFormatError(error);
    return [];
  }
}

export class SwiftFormatEditProvider
  implements
    vscode.DocumentRangeFormattingEditProvider,
    vscode.DocumentFormattingEditProvider {
  provideDocumentRangeFormattingEdits(
    document: vscode.TextDocument,
    range: vscode.Range
  ) {
    return format(document, ["--fragment"], range);
  }
  provideDocumentFormattingEdits(document: vscode.TextDocument) {
    return format(document);
  }
}
