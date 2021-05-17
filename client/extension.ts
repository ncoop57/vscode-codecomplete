// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as path from "path"
import * as vscode from 'vscode';

import { LanguageClient, TransportKind } from "vscode-languageclient/node"

let client: LanguageClient;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	let serverPath = context.asAbsolutePath(
		path.join("server", "server.js")
	)

	let serverOptions = {
		run: { module: serverPath, transport: TransportKind.ipc },
		debug: { module: serverPath, transport: TransportKind.ipc }
	}
	let clientOptions = {
		documentSelector: [{ scheme: "file", language: "python" }]
	}

	client = new LanguageClient("CodeCompleteClient", serverOptions, clientOptions)
	client.start()
}

// this method is called when your extension is deactivated
export function deactivate() {
	return client.stop()
}
