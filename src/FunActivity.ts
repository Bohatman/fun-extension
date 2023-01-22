import * as vscode from 'vscode';
import * as fs from 'fs';


class WebviewTreeItem extends vscode.TreeItem {
    constructor(label: string, htmlPath: string) {
        super(label);
        const html = fs.readFileSync(htmlPath, 'utf-8');
        vscode.commands.registerCommand(label, () => {
            const webview = vscode.window.createWebviewPanel(
                "webView",
                label,
                vscode.ViewColumn.One,
                {
                    enableScripts: true,
                }
            );
            webview.webview.html = html;
        });
        this.command = { command: label, title: "Open", arguments: [] };
    }
}
class WebviewTreeView {
	items : WebviewTreeItem[];
	constructor(list: WebviewTreeItem[]){
		this.items = list;
	}
    getTreeItem(element: WebviewTreeItem): vscode.TreeItem {
        return element;
    }

    getChildren(element?: WebviewTreeItem): Thenable<WebviewTreeItem[]> {
        return Promise.resolve(this.items);
    }
}
export {WebviewTreeItem,WebviewTreeView};