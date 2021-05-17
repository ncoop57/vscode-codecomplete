"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("vscode-languageserver/node");
const vscode_languageserver_textdocument_1 = require("vscode-languageserver-textdocument");
const connection = node_1.createConnection(node_1.ProposedFeatures.all);
const documents = new node_1.TextDocuments(vscode_languageserver_textdocument_1.TextDocument);
connection.onInitialize((params) => {
    return {
        capabilities: {
            completionProvider: {
                resolveProvider: true
            }
        }
    };
});
connection.onCompletion((params) => {
    return [
        {
            label: "for i in range(10):",
            kind: node_1.CompletionItemKind.Text,
            data: 1
        },
        {
            label: "if i < 10:",
            kind: node_1.CompletionItemKind.Text,
            data: 2
        }
    ];
});
connection.onCompletionResolve((item) => {
    if (item.data === 1) {
        item.detail = "Loops through a block of code ten times";
        item.documentation = "For loop documentation";
    }
    else if (item.data === 2) {
        item.detail = "Checks if variable i is less than 10";
        item.documentation = "If documentation";
    }
    return item;
});
documents.listen(connection);
connection.listen();
//# sourceMappingURL=server.js.map