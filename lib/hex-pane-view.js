'use babel';

import { CompositeDisposable } from 'atom';

export default class HexPaneView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('hex-pane');

    editor = atom.workspace.getActiveTextEditor();
    const text = editor.getBuffer().getText();

    // Create message element
    const message = document.createElement('div');
    message.textContent = text;
    message.classList.add('message');
    this.element.appendChild(message);
    let activeBuffer = atom.workspace.getActiveTextEditor().getBuffer();

    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(activeBuffer.onDidChange(() => {
        message.textContent = activeBuffer.getText();
    }));
        message.textContent = activeBuffer.getText();
    }));
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
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

}
