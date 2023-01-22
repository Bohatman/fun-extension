// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {WebviewTreeItem,WebviewTreeView} from './FunActivity';
import * as path from 'path';
import {iconBar,timerBar} from "./timer";
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "fun-extension" is now active!');
	let disposable = vscode.commands.registerCommand('fun-extension.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from fun-extension!');
	});
	// MEME
	// let pages01 = new WebviewTreeItem("ยินดีต้อนรับ", context.asAbsolutePath(path.join('html', 'index.html')));
	// let myTreeView = new WebviewTreeView([pages01]);
	// vscode.window.createTreeView("Mark", { treeDataProvider: myTreeView });
	context.subscriptions.push(iconBar);
	context.subscriptions.push(timerBar);
	context.subscriptions.push(disposable);
}	

// This method is called when your extension is deactivated
export function deactivate() {}
