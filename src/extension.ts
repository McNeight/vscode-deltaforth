'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('DeltaForth extension is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.sayHello', () => {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        vscode.window.showInformationMessage('Hello World!');
    });

    // 👍 formatter implemented using API
    vscode.languages.registerDocumentFormattingEditProvider('deltaforth', {
        provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {
            const firstLine = document.lineAt(0);
            if (firstLine.text.startsWith("(\tFile:")) {
                return [vscode.TextEdit.setEndOfLine(vscode.EndOfLine.CRLF)];
            }
            else if (firstLine.text.startsWith("(   File:")) {
                return [vscode.TextEdit.replace(firstLine.range, '(\tFile:\t' + document.fileName.split('\\').pop())];
            }
            else {
                return [vscode.TextEdit.insert(firstLine.range.start, '(\tFile:\t' + document.fileName.split('\\').pop() + ' )')];
            }
        }
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}