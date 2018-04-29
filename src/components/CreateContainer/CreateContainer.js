import { connect } from 'react-redux'
import { createItem } from '../../actions'
import Create from './Create/Create.js'

const mapStateToProps = state => ({
  currentFolderId: state.currentFolderId
})

const mapDispatchToProps = dispatch => ({
  createItem: (parentId, name, isFolder) => dispatch(createItem(parentId, name, isFolder))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Create)
