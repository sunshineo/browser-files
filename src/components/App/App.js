import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';

import './App.css';

import Create from '../Create/Create.js'
import CurrentPath from '../CurrentPath/CurrentPath.js'
import FileList from '../FileList/FileList.js'

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
  createNewItem(name, isFolder) {
    const id = uuidv4();
    const newItem = {
      id: id,
      name: name,
      parentId: this.state.currentFolder.id,
      isFolder: isFolder,
      children: []
    }
    this.state.currentFolder.children.push(newItem)
    const allItems = this.state.allItems
    allItems[id] = newItem
    this.setState({
      allItems: allItems
    })
    if (isFolder) {
      this.setState({
        currentFolder: newItem
      })
    }
    else {
      this.forceUpdate()
    }
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

        <Create
          createNewItem={(name, isFolder) => this.createNewItem(name, isFolder)}
        />

        <CurrentPath
          currentFolder={this.state.currentFolder}
          allItems={this.state.allItems}
          gotoFolder={(id) => this.gotoFolder(id)}
        />

        <FileList
          currentFolder={this.state.currentFolder}
          gotoFolder={(id) => this.gotoFolder(id)}
          rename={(file) => this.rename(file)}
          delete={(file) => this.delete(file)}
        />
      </div>
    );
  }
}

export default App;
