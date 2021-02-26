'use babel';

import { CompositeDisposable } from 'atom';

export default class HexPaneView {
	constructor(serializedState) {
		this.editor = atom.workspace.getActiveTextEditor();

		this.element = document.createElement('div');
		this.element.classList.add('hex-pane');

		this.eol = atom.config.get('editor.invisibles.eol');
		this.cr = atom.config.get('editor.invisibles.cr');
		this.tab = atom.config.get('editor.invisibles.tab');
		this.space = atom.config.get('editor.invisibles.space');

		let address = document.createElement('div');
		address.id = 'address';
		address.classList.add('output');
		address.textContent = this.toAddress(this.editor.getText());
		this.element.appendChild(address);

		let hex = document.createElement('div');
		hex.id = 'hex';
		hex.classList.add('output');
		hex.textContent = this.toHex(this.editor.getText());
		this.element.appendChild(hex);

		let format = document.createElement('div');
		format.id = 'format';
		format.classList.add('output');
		format.textContent = this.toFormat(this.editor.getText());
		this.element.appendChild(format);

		this.subscriptions = new CompositeDisposable(
			this.editor.onDidChange(() => {
				// looping through string 3 times ineffecient, and updating address etc even if it doesnt change
				document.getElementById('address').textContent = this.toAddress(this.editor.getText());
				document.getElementById('hex').textContent = this.toHex(this.editor.getText());
				document.getElementById('format').textContent = this.toFormat(this.editor.getText());
			})
			// observe text editor changes and update invisibles
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
		let buffer = '';
		let pos = 0;
		let pad = 0;

		pad = string.length.toString(16);
		pad = pad.length;

		for(i = 0; i < string.length; i++) {
			if(pos % 16 == 0) {
				if(i != 0) {
					buffer += '\n';
				}

				num = pos.toString(16).toUpperCase();
				while(num.length < pad) {
					num  = '0' + num;
				}
				buffer += num;
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
			switch(string[i]) {
				case ' ':
					buffer += this.space;
					break;
				case '\t':
					buffer += this.tab;
					break;
				case '\r':
					buffer += this.cr;
					break;
				case '\n':
					buffer += this.eol;
					break;
				default:
					buffer += string[i];
					break;
			}
			if(pos == 15) {
				buffer += '\n';
			}
			pos++;
			pos = pos % 16;
		}

		return buffer;
	}
}
