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

    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(activeBuffer.onDidChange(() => {
        message.textContent = this.toHex(activeBuffer.getText());
    }));
    this.subscriptions.add(atom.workspace.onDidChangeActiveTextEditor(() => {
        if(atom.workspace.getActiveTextEditor()) {
            activeBuffer = atom.workspace.getActiveTextEditor().getBuffer();
            message.textContent = this.toHex(activeBuffer.getText());
        }
    }));
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

      for(i = 0; i < string.length; i++) {
          let hex = string[i].charCodeAt(0).toString(16);
          if(hex.length < 2) {
              hex = '0' + hex;
          }
          buffer += hex
          buffer += ' ';
      }

      return buffer
  }

}
