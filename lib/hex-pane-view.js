'use babel';

import { CompositeDisposable } from 'atom';

export default class HexPaneView {
	constructor(serializedState) {
		this.editor = atom.workspace.getActiveTextEditor();

		this.element = document.createElement('div');
		this.element.classList.add('hex-pane');

		this.address = document.createElement('div');
		this.address.classList.add('output');
		this.address.textContent = this.toAddress(this.editor.getText());
		this.element.appendChild(this.address);

		this.hex = document.createElement('div');
		this.hex.classList.add('output');
		this.hex.textContent = this.toHex(this.editor.getText());
		this.element.appendChild(this.hex);

		this.format = document.createElement('div');
		this.format.classList.add('output');
		this.format.textContent = this.toFormat(this.editor.getText());
		this.element.appendChild(this.format);


		this.subscriptions = new CompositeDisposable(
			this.editor.onDidChange(() => {
				this.address.textContent = this.toAddress(this.editor.getText());
				this.hex.textContent = this.toHex(this.editor.getText());
				this.format.textContent = this.toFormat(this.editor.getText());
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

	toAddress(string) {
		let buffer = '000000';
		let pos = 0;

		for(i = 0; i < string.length; i++) {
			if(pos % 16 == 0) {
				buffer += '\n';
				buffer += pos.toString(16).toUpperCase();
			}
			pos++;
		}

		return buffer;
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

	toFormat(string) {
		let buffer = '';
		let pos = 0;

		for(i = 0; i < string.length; i++) {
			buffer += string[i];
			if(pos == 15) {
				buffer += '\n';
			}
			pos++;
			pos = pos % 16;
		}

		return buffer;
	}
}
