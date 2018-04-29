import { connect } from 'react-redux'
import { gotoFolder, renameItem, deleteItem } from '../../actions'
import FileList from './FileList/FileList.js'

const mapStateToProps = state => ({
  currentFolderId: state.currentFolderId,
  allItems: state.allItems
})

const mapDispatchToProps = dispatch => ({
  gotoFolder: (id) => dispatch(gotoFolder(id)),
  renameItem: (id, name) => dispatch(renameItem(id, name)),
  deleteItem: (id) => dispatch(deleteItem(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileList)
