import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Nav,
  NavItem
} from 'react-bootstrap';

class CurrentPath extends Component {
  constructor(props) {
    super(props)
    const path = this.calculatePath(props)
    this.state = {
      path: path
    }
  }

  calculatePath(props) {
    const path = []
    let pointer = props.currentFolder
    while(pointer != null) {
      path.unshift(pointer)
      pointer = props.allItems[pointer.parentId]
    }
    return path
  }

  componentWillReceiveProps(nextProps) {
    const path = this.calculatePath(nextProps)
    this.setState({ path: path })
  }

  render() {
    return (
      <Nav bsStyle="pills">
        {this.state.path.map(folder=>(
          <NavItem key={folder.id} eventKey={folder.id} onSelect={() => this.props.gotoFolder(folder.id)}>
            > {folder.name}
          </NavItem>
        ))}
      </Nav>
    );
  }
}

CurrentPath.propTypes = {
  gotoFolder: PropTypes.func,
  currentFolder: PropTypes.object,
  allItems: PropTypes.object
}

export default CurrentPath
