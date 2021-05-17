"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const path = require("path");
const node_1 = require("vscode-languageclient/node");
let client;
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    let serverPath = context.asAbsolutePath(path.join("server", "server.js"));
    let serverOptions = {
        run: { module: serverPath, transport: node_1.TransportKind.ipc },
        debug: { module: serverPath, transport: node_1.TransportKind.ipc }
    };
    let clientOptions = {
        documentSelector: [{ scheme: "file", language: "python" }]
    };
    client = new node_1.LanguageClient("CodeCompleteClient", serverOptions, clientOptions);
    client.start();
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
    return client.stop();
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map