import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';

import './App.css';

import CreateContainer from './CreateContainer/CreateContainer.js'
import CurrentPathContainer from './CurrentPathContainer/CurrentPathContainer.js'
import FileListContainer from './FileListContainer/FileListContainer.js'

class App extends Component {
  constructor(props) {
    super(props)

    const homeFolder = {
      id: uuidv4(),
      name: 'Home',
      parentId: null,
      isFolder: true,
      children: []
    }
    const allItems = {}
    allItems[homeFolder.id] = homeFolder

    this.state = {
      allItems: allItems,
      currentFolder: homeFolder
    }
  }

  gotoFolder(key) {
    const newCurrentFolder = this.state.allItems[key]
    this.setState({
      currentFolder: newCurrentFolder
    })
  }
  delete(toDelete) {
    const currentFolder = this.state.currentFolder
    const index = currentFolder.children.indexOf(toDelete);
    if (index > -1) {
      currentFolder.children.splice(index, 1);
    }
    this.setState({
      currentFolder: currentFolder
    })
  }
  rename(toRename) {
    const newName = prompt("Enter the new name?");
    toRename.name = newName
    this.forceUpdate()
  }

  render() {
    return (
      <div className="App">

        <CreateContainer />

        <CurrentPathContainer />

        <FileListContainer />
      </div>
    );
  }
}

export default App;
