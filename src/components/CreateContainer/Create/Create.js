import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  FormControl,
  FormGroup,
  Button
} from 'react-bootstrap';

class Create extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: ''
    }
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleCreateItem(isFolder) {
    const name = this.state.name
    const parentId = this.props.currentFolderId
    this.props.createItem(parentId, name, isFolder)
    this.setState({ name: '' });
  }

  render() {
    return (
      <Form inline>
        <FormGroup controlId="formBasicText">
          <FormControl type="text" value={this.state.name} placeholder="Name" onChange={e => this.handleNameChange(e)}/>
          <Button bsStyle="primary" onClick={() => this.handleCreateItem(true)}>New Folder</Button>
          <Button bsStyle="primary" onClick={() => this.handleCreateItem(false)}>New File</Button>
        </FormGroup>
      </Form>
    );
  }
}

Create.propTypes = {
  createNewItem: PropTypes.func,
  currentFolderId: PropTypes.string
}

export default Create
