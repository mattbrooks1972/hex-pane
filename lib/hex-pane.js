'use babel';

import HexPaneView from './hex-pane-view';
import { CompositeDisposable } from 'atom';

export default {

  hexPaneView: null,
  subscriptions: null,

  activate(state) {
    this.hexPaneView = new HexPaneView(state.hexPaneViewState);

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable(
        atom.workspace.addOpener(uri => {
            if(uri == this.hexPaneView.getURI()) {
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
    this.subscriptions.dispose();
    this.hexPaneView.destroy();
  },

  serialize() {
    return {
      hexPaneViewState: this.hexPaneView.serialize()
    };
  },

  toggle() {
    const pane = atom.workspace.paneForURI(this.hexPaneView.getURI())
    if(pane) {
        pane.destroy();
        this.deactivate();
    } else {
        atom.workspace.open(this.hexPaneView.getURI(), {
            split: 'right',
            searchAllPanes: true
        });
    }
  }

};
