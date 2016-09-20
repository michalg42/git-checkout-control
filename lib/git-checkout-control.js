'use babel';

import GitCheckoutControlView from './git-checkout-control-view';
import { CompositeDisposable, BufferedProcess } from 'atom';

export default {

  // gitCheckoutControlView: null,
  // modalPanel: null,
  // subscriptions: null,

  getRepo() {
    return new Promise((resolve, reject) => {
      const path = atom.workspace.getActiveTextEditor().getPath();
      const directory = atom.project.getDirectories().filter((d) => d.contains(path))[0];
      console.log(directory);
      if (directory !== undefined) {
        atom.project.repositoryForDirectory(directory).then((repo) => {
          const submodule = repo.repo.submoduleForPath(path);
          if (submodule !== null) {
            resolve(submodule);
          } else {
            resolve(repo);
          }
        });
      } else {
        reject('No current file');
      }
    });
  },

  activate(state) {
    this.getRepo().then((repo) => {
      console.log(repo);
      new BufferedProcess({
        command: 'git',
        args: ['rev-list', 'origin..HEAD'],
        options: {
          cwd: repo.getWorkingDirectory()
        },
        stdout: (res) => {
          console.log(res);
        },
        stderr: (res) => {
          console.error(res);
        }
      });
    });
    // this.gitCheckoutControlView = new GitCheckoutControlView(state.gitCheckoutControlViewState);
    // this.modalPanel = atom.workspace.addModalPanel({
    //   item: this.gitCheckoutControlView.getElement(),
    //   visible: false
    // });
    //
    // // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    // this.subscriptions = new CompositeDisposable();
    //
    // // Register command that toggles this view
    // this.subscriptions.add(atom.commands.add('atom-workspace', {
    //   'git-checkout-control:toggle': () => this.toggle()
    // }));
  },

  deactivate() {
    // this.modalPanel.destroy();
    // this.subscriptions.dispose();
    // this.gitCheckoutControlView.destroy();
  },

  serialize() {
    // return {
    //   gitCheckoutControlViewState: this.gitCheckoutControlView.serialize()
    // };
  },

  // toggle() {
  //   console.log('GitCheckoutControl was toggled!');
  //   return (
  //     this.modalPanel.isVisible() ?
  //     this.modalPanel.hide() :
  //     this.modalPanel.show()
  //   );
  // }

};
