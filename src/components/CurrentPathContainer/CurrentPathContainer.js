import { connect } from 'react-redux'
import { gotoFolder } from '../../actions'
import CurrentPath from './CurrentPath/CurrentPath.js'

const mapStateToProps = state => ({
  currentFolderId: state.currentFolderId,
  allItems: state.allItems
})

const mapDispatchToProps = dispatch => ({
  gotoFolder: id => dispatch(gotoFolder(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentPath)
