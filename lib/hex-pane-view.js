'use babel';

import { CompositeDisposable } from 'atom';

export default class HexPaneView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('hex-pane');

    editor = atom.workspace.getActiveTextEditor();
    const text = this.toHex(editor.getBuffer().getText());

    // Create message element
    const message = document.createElement('div');
    message.textContent = text;
    message.classList.add('message');
    this.element.appendChild(message);
    let activeBuffer = atom.workspace.getActiveTextEditor().getBuffer();

    this.subscriptions = new CompositeDisposable(
		activeBuffer.onDidChange(() => {
	        message.textContent = this.toHex(activeBuffer.getText());
	    }),
	    atom.workspace.onDidChangeActiveTextEditor(() => {
	        if(atom.workspace.getActiveTextEditor()) {
	            activeBuffer = atom.workspace.getActiveTextEditor().getBuffer();
	            message.textContent = this.toHex(activeBuffer.getText());
	        }
	    })
	);
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
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
      return 'atom://hex-pane'
  }

  toHex(string) {
      let buffer = ''
      let pos = 0

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

      return buffer
  }

}
