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
				nul: {
					description: 'Used to render null, \`\\0\` or \`\\x00\`.',
					type: 'string',
					order: 1,
					default: '\u2400'
				},
				soh: {
					description: 'Used to render start of heading, \`\\x01\`.',
					type: 'string',
					order: 2,
					default: '\u2401'
				},
				stx: {
					description: 'Used to render start of text, \`\\x02\`.',
					type: 'string',
					order: 3,
					default: '\u2402'
				},
				etx: {
					description: 'Used to render end of heading, \`\\x03\`.',
					type: 'string',
					order: 4,
					default: '\u2403'
				},
				eot: {
					description: 'Used to render end of transmission, \`\\x04\`.',
					type: 'string',
					order: 5,
					default: '\u2404'
				},
				enq: {
					description: 'Used to render enquiry, \`\\x05\`.',
					type: 'string',
					order: 6,
					default: '\u2405'
				},
				ack: {
					description: 'Used to render acknowledge, \`\\x06\`.',
					type: 'string',
					order: 7,
					default: '\u2406'
				},
				bel: {
					description: 'Used to render bell (alert), \`\\a\` or \`\\x07\`.',
					type: 'string',
					order: 8,
					default: '\u2407'
				},
				bs: {
					description: 'Used to render backspace, \`\\b\` or \`\\x08\`.',
					type: 'string',
					order: 9,
					default: '\u2408'
				},
				ht: {
					description: 'Used to render horizontal tabs, \`\\t\` or \`\\x09\`.',
					type: 'string',
					order: 10,
					default: atom.config.get('editor.invisibles.tab')
				},
				lf: {
					description: 'Used to render line feeds, \`\\n\` or \`\\x0a\`.',
					type: 'string',
					order: 11,
					default: atom.config.get('editor.invisibles.eol')
				},
				vt: {
					description: 'Used to render vertical tabs, \`\\v\` or \`\\x0b\`.',
					type: 'string',
					order: 12,
					default: '\u240b'
				},
				ff: {
					description: 'Used to render form feed, \`\\f\` or \`\\x0c\`.',
					type: 'string',
					order: 13,
					default: '\u240c'
				},
				cr: {
					description: 'Used to render carriage returns, \`\\r\` or \`\\x0d\`.',
					type: 'string',
					order: 14,
					default: atom.config.get('editor.invisibles.cr')
				},
				so: {
					description: 'Used to render shift out, \`\\x0e\`.',
					type: 'string',
					order: 15,
					default: '\u240e'
				},
				si: {
					description: 'Used to render shift in, \`\\x0f\`.',
					type: 'string',
					order: 16,
					default: '\u240f'
				},
				dle: {
					description: 'Used to render data link escape, \`\\x10\`.',
					type: 'string',
					order: 17,
					default: '\u2410'
				},
				dc1: {
					description: 'Used to render device control one, \`\\x11\`.',
					type: 'string',
					order: 18,
					default: '\u2411'
				},
				dc2: {
					description: 'Used to render device control two (xon), \`\\x12\`.',
					type: 'string',
					order: 19,
					default: '\u2412'
				},
				dc3: {
					description: 'Used to render device control three, \`\\x13\`.',
					type: 'string',
					order: 20,
					default: '\u2413'
				},
				dc4: {
					description: 'Used to render start of heading (xoff), \`\\x14\`.',
					type: 'string',
					order: 21,
					default: '\u2414'
				},
				nak: {
					description: 'Used to render negative acknowledge, \`\\x15\`.',
					type: 'string',
					order: 22,
					default: '\u2415'
				},
				syn: {
					description: 'Used to render synchronous idle, \`\\x16\`.',
					type: 'string',
					order: 23,
					default: '\u2416'
				},
				etb: {
					description: 'Used to render end of transmission block, \`\\x17\`.',
					type: 'string',
					order: 24,
					default: '\u2417'
				},
				can: {
					description: 'Used to render cancel, \`\\x18\`.',
					type: 'string',
					order: 25,
					default: '\u2418'
				},
				em: {
					description: 'Used to render end of medium, \`\\x19\`.',
					type: 'string',
					order: 26,
					default: '\u2419'
				},
				sub: {
					description: 'Used to render substitute, \`\\x1a\`.',
					type: 'string',
					order: 27,
					default: '\u241a'
				},
				esc: {
					description: 'Used to render escape, \`\\e\` or \`\\x1b\`.',
					type: 'string',
					order: 28,
					default: '\u241b'
				},
				fs: {
					description: 'Used to render file seperator, \`\\x1c\`.',
					type: 'string',
					order: 29,
					default: '\u241c'
				},
				gs: {
					description: 'Used to render group seperator, \`\\x1d\`.',
					type: 'string',
					order: 30,
					default: '\u241d'
				},
				rs: {
					description: 'Used to render record seperator, \`\\x1e\`.',
					type: 'string',
					order: 31,
					default: '\u241e'
				},
				us: {
					description: 'Used to render unit seperator, \`\\x1f\`.',
					type: 'string',
					order: 32,
					default: '\u241f'
				},
				sp: {
					description: 'Used to render spaces, \` \` or \`\\x20\`.',
					type: 'string',
					order: 33,
					default: atom.config.get('editor.invisibles.space')
				},
				del: {
					description: 'Used to render delete, \`\\x7f\`.',
					type: 'string',
					order: 34,
					default: '\u2421'
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
