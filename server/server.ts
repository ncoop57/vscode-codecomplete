import { CompletionItemKind, createConnection, ProposedFeatures, TextDocuments } from "vscode-languageserver/node"
import { TextDocument } from "vscode-languageserver-textdocument"

const connection = createConnection(ProposedFeatures.all)
const documents = new TextDocuments(TextDocument)

connection.onInitialize((params) => {
    return {
        capabilities: {
            completionProvider: {
                resolveProvider: true
            }
        }
    }
})

connection.onCompletion((params) => {
    return [
        {
            label: "for i in range(10):",
            kind: CompletionItemKind.Text,
            data: 1
        },
        {
            label: "if i < 10:",
            kind: CompletionItemKind.Text,
            data: 2
        }
    ]
})

connection.onCompletionResolve((item) => {
    if (item.data === 1) {
        item.detail = "Loops through a block of code ten times"
        item.documentation = "For loop documentation"
    } else if (item.data === 2) {
        item.detail = "Checks if variable i is less than 10"
        item.documentation = "If documentation"
    }
    return item
})

documents.listen(connection)
connection.listen()