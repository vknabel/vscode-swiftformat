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

function format(request: {
  document: vscode.TextDocument;
  parameters?: string[];
  range?: vscode.Range;
  formatting: vscode.FormattingOptions;
}) {
  try {
    const input = request.document.getText(request.range);
    const userDefinedParams = Current.config.formatOptions();
    const formattingParameters =
      userDefinedParams.indexOf("--indent") !== -1
        ? []
        : [
            "--indent",
            request.formatting.insertSpaces
              ? `${request.formatting.tabSize}`
              : "tabs"
          ];
    const newContents = childProcess
      .execFileSync(
        Current.config.swiftFormatPath(),
        [
          ...userDefinedParams,
          ...(request.parameters || []),
          ...formattingParameters
        ],
        {
          encoding: "utf8",
          input
        }
      )
      .slice(0, -1);
    return newContents !== request.document.getText(request.range)
      ? [
          vscode.TextEdit.replace(
            request.document.validateRange(request.range || wholeDocumentRange),
            newContents
          )
        ]
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
    range: vscode.Range,
    formatting: vscode.FormattingOptions
  ) {
    return format({ document, parameters: ["--fragment"], range, formatting });
  }
  provideDocumentFormattingEdits(
    document: vscode.TextDocument,
    formatting: vscode.FormattingOptions
  ) {
    return format({ document, formatting });
  }
}
