import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  Nav,
  NavItem,
  Form,
  FormControl,
  FormGroup,
  Button,
  ListGroup,
  ListGroupItem
} from 'react-bootstrap';
import uuidv4 from 'uuid/v4';

class App extends Component {
  constructor(props) {
    super(props)

    const homeFolder = {
      id: 'id0',
      name: 'Home',
      parentId: null,
      isFolder: true,
      children: []
    }

    this.state = {
      allFolders: {
        'id0': homeFolder
      },
      currentFolder: homeFolder,
      path: [
        homeFolder
      ],
      newItemName: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleNewFolderClick = this.handleNewFolderClick.bind(this);
    this.handleNewFileClick = this.handleNewFileClick.bind(this);
  }
  handleFileSelect(key) {
    console.log(key)
  }
  handleFolderSelect(key) {
    const newCurrentFolder = this.state.allFolders[key]
    const newPath = []
    let pointer = newCurrentFolder
    while(pointer != null) {
      newPath.unshift(pointer)
      pointer = this.state.allFolders[pointer.parentId]
    }
    this.setState({
      currentFolder: newCurrentFolder,
      path: newPath
    })
  }
  handleChange(e) {
    this.setState({ newItemName: e.target.value });
  }
  handleNewFolderClick() {
    console.log('new folder name: ' + this.state.newItemName)
    const id = uuidv4();
    const newFolder = {
      id: id,
      name: this.state.newItemName,
      parentId: this.state.currentFolder.id,
      isFolder: true,
      children: []
    }
    console.log(newFolder)
    this.state.allFolders[id] = newFolder
    this.state.currentFolder.children.push(newFolder)
    const newPath = []
    let pointer = newFolder
    while(pointer != null) {
      newPath.unshift(pointer)
      pointer = this.state.allFolders[pointer.parentId]
    }
    this.setState({
      newItemName: '',
      currentFolder: newFolder,
      path: newPath
    });

  }
  handleNewFileClick() {
    console.log('new file name: ' + this.state.newItemName)
    const id = uuidv4();
    const newFile = {
      id: id,
      name: this.state.newItemName,
      parentId: this.state.currentFolder.id,
      isFolder: false,
      children: []
    }
    console.log(newFile)
    this.state.allFolders[id] = newFile
    this.state.currentFolder.children.push(newFile)

    this.setState({
      newItemName: ''
    });
  }
  handleDelete(toDelete) {
    const currentFolder = this.state.currentFolder
    const index = currentFolder.children.indexOf(toDelete);
    if (index > -1) {
      currentFolder.children.splice(index, 1);
    }
    this.setState({
      currentFolder: currentFolder
    })
  }
  handleRename(toRename) {
    const newName = prompt("Enter the new name?");
    toRename.name = newName
    this.forceUpdate()
  }

  render() {
    const divStyle = {
      'text-align': 'left'
    }
    const listGroupItemStyle = {
      'float': 'left',
      width: '80%'
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <Form inline>
          <FormGroup controlId="formBasicText">
            <FormControl type="text" value={this.state.newItemName} placeholder="Name" onChange={this.handleChange}/>
            <Button bsStyle="primary" onClick={this.handleNewFolderClick}>New Folder</Button>
            <Button bsStyle="primary" onClick={this.handleNewFileClick}>New File</Button>
          </FormGroup>
        </Form>

        <Nav bsStyle="pills">
          {this.state.path.map(folder=>(
            <NavItem key={folder.id} eventKey={folder.id} onSelect={key => this.handleFolderSelect(key)}>
              > {folder.name}
            </NavItem>
          ))}
        </Nav>

        {this.state.currentFolder.children.length === 0
        ? <h1>There is nothing in this folder</h1>
        : undefined}
        <ListGroup>
          {this.state.currentFolder.children.map(child=>(
            <div key={child.id} style={divStyle}>
            {child.isFolder
            ? <ListGroupItem style={listGroupItemStyle} bsStyle="success" onClick={() => this.handleFolderSelect(child.id)}>
                {child.name}
              </ListGroupItem>
            : <ListGroupItem style={listGroupItemStyle} bsStyle="danger" onClick={() => this.handleFileSelect(child.id)}>
                {child.name}
              </ListGroupItem>
            }
              <Button bsStyle="primary" onClick={() => this.handleRename(child)}>Rename</Button>
              <Button bsStyle="danger" onClick={() => this.handleDelete(child)}>Delete</Button>
            </div>
          ))}
        </ListGroup>
      </div>
    );
  }
}

export default App;
