import axios from "axios";
import {
    CompletionItemKind, createConnection,
    ProposedFeatures, TextDocuments
} from "vscode-languageserver/node";
import { TextDocument } from "vscode-languageserver-textdocument";

const connection = createConnection(ProposedFeatures.all);
const documents = new TextDocuments(TextDocument);

connection.onInitialize((params) => {
    return {
        capabilities: {
            completionProvider: {
                resolveProvider: true
            }
        }
    };
});

const API_URL = "https://api-inference.huggingface.co/models/EleutherAI/gpt-neo-2.7B";
// eslint-disable-next-line @typescript-eslint/naming-convention
const headers = { "Authorization": "Bearer <API_TOKEN>" };

connection.onCompletion(async (params) => {
    let text = documents.get(params.textDocument.uri)?.getText();
    if (text === undefined) {
        return [];
    }
    const tok = text.split(" ")[-1];
    const lines = text.split("\n");
    const lineLen = lines.length - 1;
    const len = lines[lineLen].length - 1;

    let response = await axios.post(
        String(API_URL),
        { "inputs": text }, { headers: headers }
    );
    let completion = response.data[0].generated_text.split("\n")[lineLen];
    completion = completion.slice(len);

    return [
        {
            label: completion,
            insertText: completion,
            kind: CompletionItemKind.Text,
            data: 1
        }
    ];
});

connection.onCompletionResolve((item) => {
    if (item.data === 1) {
        item.detail = "Autogenerated completion using deep learninng.";
        item.documentation = "";
    }
    return item;
});

documents.listen(connection);
connection.listen();