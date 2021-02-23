'use babel';

export default class HexPaneView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('hex-pane');

    // Create message element
    const message = document.createElement('div');
    message.textContent = 'The HexPane package is Alive! It\'s ALIVE!';
    message.classList.add('message');
    this.element.appendChild(message);
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
