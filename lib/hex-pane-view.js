'use babel';

import { CompositeDisposable } from 'atom';

export default class HexPaneView {
	constructor(serializedState) {
		this.editor = atom.workspace.getActiveTextEditor();

		this.element = document.createElement('div');
		this.element.classList.add('hex-pane');

		this.hex = document.createElement('div');
		this.hex.textContent = this.toHex(this.editor.getText());
		this.element.appendChild(this.hex);

		this.subscriptions = new CompositeDisposable(
			this.editor.onDidChange(() => {
				this.hex.textContent = this.toHex(this.editor.getText());
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
