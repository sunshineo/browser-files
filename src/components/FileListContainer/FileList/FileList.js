import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ListGroup,
  ListGroupItem,
  Button
} from 'react-bootstrap';

import './FileList.css';

class FileList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      files: this.calculateFiles(props)
    }
  }

  calculateFiles(props) {
    const currentFolderId = props.currentFolderId
    const allItems = props.allItems

    const currentFolder = allItems[currentFolderId]
    const childIds = currentFolder.childIds
    const children = childIds.map((childId) => {
      return allItems[childId]
    })
    return children
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ files: this.calculateFiles(nextProps) })
  }

  handleRename(file) {
    const newName = prompt("Enter the new name?");
    this.props.renameItem(file.id, newName)
  }

  handleDelete(file) {
    const anwser = window.confirm("Are you sure?");
    if (anwser) {
      this.props.deleteItem(file.id)
    }
  }

  render() {
    return (
      <div>
        {this.state.files.length === 0
        ? <h1>There is nothing in this folder</h1>
        : undefined}
        <ListGroup>
          {this.state.files.map(file=>(
            <div key={file.id} className="file-list-div">
            {file.isFolder
            ? <ListGroupItem className="file-list-item" bsStyle="success" onClick={() => this.props.gotoFolder(file.id)}>
                {file.name}
              </ListGroupItem>
            : <ListGroupItem className="file-list-item" bsStyle="danger">
                {file.name}
              </ListGroupItem>
            }
              <Button bsStyle="primary" onClick={() => this.handleRename(file)}>Rename</Button>
              <Button bsStyle="danger" onClick={() => this.handleDelete(file)}>Delete</Button>
            </div>
          ))}
        </ListGroup>
      </div>
    )
  }
}

FileList.propTypes = {
  gotoFolder: PropTypes.func,
  renameItem: PropTypes.func,
  deleteItem: PropTypes.func,
  currentFolderId: PropTypes.string,
  allItems: PropTypes.object
}

export default FileList
