'use babel';

import HexPaneView from './hex-pane-view';
import { CompositeDisposable } from 'atom';

export default {
	hexPaneView: null,
	subscriptions: null,

	activate(state) {
		this.hexPaneView = new HexPaneView(state.hexPaneViewState);

		this.subscriptions = new CompositeDisposable(
			atom.workspace.addOpener(uri => {
				if(uri == this.hexPaneView.getURI()) {
					return new HexPaneView();
				}
			}),
			atom.commands.add('atom-workspace', {
				'hex-pane:toggle': () => this.toggle()
			})
		);
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
		const pane = atom.workspace.paneForURI(this.hexPaneView.getURI());
		let item = undefined;
		if(pane) {
			item = pane.itemForURI(this.hexPaneView.getURI());
		}

		if(item) {
			pane.destroyItem(item);
			this.hexPaneView.destroy();
		} else {
			atom.workspace.open(this.hexPaneView.getURI(), {
				split: 'right',
				searchAllPanes: true
			});
		}
	}
};
