'use babel';

import HexPaneView from './hex-pane-view';
import { CompositeDisposable } from 'atom';

export default {
	config: {
		uppercase: {
			description: 'Render hex output as uppercase.',
			type: 'boolean',
			order: 1,
			default: true
		},
		invisibles: {
			description: 'Define replacement characters for ASCII control characters, defaults to editor settings.',
			type: 'object',
			order: 2,
			properties: {
				cr: {
					description: 'Used to render carriage returns \\r.',
					type: 'string',
					order: 1,
					default: atom.config.get('editor.invisibles.cr')
				},
				eol: {
					description: 'Used to render new lines \\n.',
					type: 'string',
					order: 2,
					default: atom.config.get('editor.invisibles.eol')
				},
				tab: {
					description: 'Used to render horizontal tabs \\t.',
					type: 'string',
					order: 3,
					default: atom.config.get('editor.invisibles.tab')
				},
				space: {
					description: 'Used to render spaces.',
					type: 'string',
					order: 4,
					default: atom.config.get('editor.invisibles.space')
				}
			}
		}
	},

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
