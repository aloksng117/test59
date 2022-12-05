'use babel';

import Test59View from './test59-view';
import { CompositeDisposable } from 'atom';

export default {

  test59View: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.test59View = new Test59View(state.test59ViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.test59View.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'test59:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.test59View.destroy();
  },

  serialize() {
    return {
      test59ViewState: this.test59View.serialize()
    };
  },

  toggle() {
    console.log('Test59 was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
