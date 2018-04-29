import React, { Component } from 'react';
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

  handleChange(e) {
    this.setState({ name: e.target.value });
  }

  handleNewFolderClick() {
    this.setState({ name: '' });
    this.props.createNewItem(this.state.name, true)
  }

  handleNewFileClick() {
    this.setState({ name: '' });
    this.props.createNewItem(this.state.name, false)
  }

  render() {
    return (
      <Form inline>
        <FormGroup controlId="formBasicText">
          <FormControl type="text" value={this.state.name} placeholder="Name" onChange={e => this.handleChange(e)}/>
          <Button bsStyle="primary" onClick={() => this.handleNewFolderClick()}>New Folder</Button>
          <Button bsStyle="primary" onClick={() => this.handleNewFileClick()}>New File</Button>
        </FormGroup>
      </Form>
    );
  }
}

export default Create
