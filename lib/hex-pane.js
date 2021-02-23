'use babel';

import HexPaneView from './hex-pane-view';
import { CompositeDisposable } from 'atom';

export default {

  hexPaneView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.hexPaneView = new HexPaneView(state.hexPaneViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.hexPaneView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable(
        atom.workspace.addOpener(uri => {
            if(uri == 'atom://hex-pane') {
                return new HexPaneView();
            }
        })
    );

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'hex-pane:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.hexPaneView.destroy();
  },

  serialize() {
    return {
      hexPaneViewState: this.hexPaneView.serialize()
    };
  },

  toggle() {
    console.log('HexPane was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
