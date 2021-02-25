'use babel';

import { CompositeDisposable } from 'atom';

export default class HexPaneView {
	constructor(serializedState) {
		this.element = document.createElement('div');
		this.element.classList.add('hex-pane');
		this.element.textContent = this.toHex(atom.workspace.getActiveTextEditor().getBuffer().getText());

		this.subscriptions = new CompositeDisposable(
			atom.workspace.getActiveTextEditor().getBuffer().onDidChange(() => {
				this.element.textContent = this.toHex(atom.workspace.getActiveTextEditor().getBuffer().getText());
			}),
			atom.workspace.onDidChangeActiveTextEditor(() => {
				if(atom.workspace.getActiveTextEditor()) {
					this.element.textContent = this.toHex(atom.workspace.getActiveTextEditor().getBuffer().getText());
				}
			})
		);
	}

	serialize() {}

	destroy() {
		this.element.remove();
		this.subscriptions.dispose();
	}

	getElement() {
		return this.element;
	}

	getTitle() {
		return 'Hex Pane';
	}

	getURI() {
		return 'atom://hex-pane';
	}

	toHex(string) {
		let buffer = '';
		let pos = 0;

		for(i = 0; i < string.length; i++) {
			let hex = string[i].charCodeAt(0).toString(16).toUpperCase();
			if(hex.length < 2) {
				hex = '0' + hex;
			}
			buffer += hex
			switch(pos) {
				case 3:
				case 7:
				case 11:
					buffer += '\t';
					break;
				case 15:
					buffer += '\n';
					break;
				default:
					buffer += ' ';
					break;
			}
			pos++;
			pos = pos % 16;
		}

		return buffer;
	}
}
