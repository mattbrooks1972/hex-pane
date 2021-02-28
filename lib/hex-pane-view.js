'use babel';

import { CompositeDisposable } from 'atom';

export default class HexPaneView {
	constructor(serializedState) {
		this.editor = atom.workspace.getActiveTextEditor();

		this.element = document.createElement('div');
		this.element.classList.add('hex-pane');

		this.invisibles = {
			nul: atom.config.get('hex-pane.invisibles.nul'),
			soh: atom.config.get('hex-pane.invisibles.soh'),
			stx: atom.config.get('hex-pane.invisibles.stx'),
			etx: atom.config.get('hex-pane.invisibles.etx'),
			eot: atom.config.get('hex-pane.invisibles.eot'),
			enq: atom.config.get('hex-pane.invisibles.enq'),
			ack: atom.config.get('hex-pane.invisibles.ack'),
			bel: atom.config.get('hex-pane.invisibles.bel'),
			bs: atom.config.get('hex-pane.invisibles.bs'),
			ht: atom.config.get('hex-pane.invisibles.ht'),
			lf: atom.config.get('hex-pane.invisibles.lf'),
			vt: atom.config.get('hex-pane.invisibles.vt'),
			ff: atom.config.get('hex-pane.invisibles.ff'),
			cr: atom.config.get('hex-pane.invisibles.cr'),
			so: atom.config.get('hex-pane.invisibles.so'),
			si: atom.config.get('hex-pane.invisibles.si'),
			dle: atom.config.get('hex-pane.invisibles.dle'),
			dc1: atom.config.get('hex-pane.invisibles.dc1'),
			dc2: atom.config.get('hex-pane.invisibles.dc2'),
			dc3: atom.config.get('hex-pane.invisibles.dc3'),
			dc4: atom.config.get('hex-pane.invisibles.dc4'),
			nak: atom.config.get('hex-pane.invisibles.nak'),
			syn: atom.config.get('hex-pane.invisibles.syn'),
			etb: atom.config.get('hex-pane.invisibles.etb'),
			can: atom.config.get('hex-pane.invisibles.can'),
			em: atom.config.get('hex-pane.invisibles.em'),
			sub: atom.config.get('hex-pane.invisibles.sub'),
			esc: atom.config.get('hex-pane.invisibles.esc'),
			fs: atom.config.get('hex-pane.invisibles.fs'),
			gs: atom.config.get('hex-pane.invisibles.gs'),
			rs: atom.config.get('hex-pane.invisibles.rs'),
			us: atom.config.get('hex-pane.invisibles.us'),
			sp: atom.config.get('hex-pane.invisibles.sp'),
			del: atom.config.get('hex-pane.invisibles.del')
		};

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

				if(atom.config.get('hex-pane.uppercase')) {
					num = pos.toString(16).toUpperCase();
				} else {
					num = pos.toString(16).toLowerCase();
				}
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
			let hex = string[i].charCodeAt(0).toString(16);
			if(atom.config.get('hex-pane.uppercase')) {
				hex = hex.toUpperCase();
			} else {
				hex = hex.toLowerCase();
			}

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
				case '\x00':
					buffer += this.invisibles.nul;
					break;
				case '\x01':
					buffer += this.invisibles.soh;
					break;
				case '\x02':
					buffer += this.invisibles.stx;
					break;
				case '\x03':
					buffer += this.invisibles.etx;
					break;
				case '\x04':
					buffer += this.invisibles.eot;
					break;
				case '\x05':
					buffer += this.invisibles.enq;
					break;
				case '\x06':
					buffer += this.invisibles.ack;
					break;
				case '\x07':
					buffer += this.invisibles.bel;
					break;
				case '\x08':
					buffer += this.invisibles.bs;
					break;
				case '\x09':
					buffer += this.invisibles.ht;
					break;
				case '\x0a':
					buffer += this.invisibles.lf;
					break;
				case '\x0b':
					buffer += this.invisibles.vt;
					break;
				case '\x0c':
					buffer += this.invisibles.ff;
					break;
				case '\x0d':
					buffer += this.invisibles.cr;
					break;
				case '\x0e':
					buffer += this.invisibles.so;
					break;
				case '\x0f':
					buffer += this.invisibles.si;
					break;
				case '\x10':
					buffer += this.invisibles.dle;
					break;
				case '\x11':
					buffer += this.invisibles.dc1;
					break;
				case '\x12':
					buffer += this.invisibles.dc2;
					break;
				case '\x13':
					buffer += this.invisibles.dc3;
					break;
				case '\x14':
					buffer += this.invisibles.dc4;
					break;
				case '\x15':
					buffer += this.invisibles.nak;
					break;
				case '\x16':
					buffer += this.invisibles.syn;
					break;
				case '\x17':
					buffer += this.invisibles.etb;
					break;
				case '\x18':
					buffer += this.invisibles.can;
					break;
				case '\x19':
					buffer += this.invisibles.em;
					break;
				case '\x1a':
					buffer += this.invisibles.sub;
					break;
				case '\x1b':
					buffer += this.invisibles.esc;
					break;
				case '\x1c':
					buffer += this.invisibles.fs;
					break;
				case '\x1d':
					buffer += this.invisibles.gs;
					break;
				case '\x1e':
					buffer += this.invisibles.rs;
					break;
				case '\x1f':
					buffer += this.invisibles.us;
					break;
				case '\x20':
					buffer += this.invisibles.sp;
					break;
				case '\x7f':
					buffer += this.invisibles.del;
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
