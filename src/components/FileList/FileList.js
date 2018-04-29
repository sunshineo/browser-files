import React, { Component } from 'react';
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
      files: props.currentFolder.children
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ files: nextProps.currentFolder.children })
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
              <Button bsStyle="primary" onClick={() => this.props.rename(file)}>Rename</Button>
              <Button bsStyle="danger" onClick={() => this.props.delete(file)}>Delete</Button>
            </div>
          ))}
        </ListGroup>
      </div>
    )
  }
}

export default FileList
