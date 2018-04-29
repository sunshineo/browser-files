import uuidv4 from 'uuid/v4';

const homeFolder = {
  id: uuidv4(),
  name: 'Home',
  parentId: null,
  isFolder: true,
  childIds: []
}
const allItems = {}
allItems[homeFolder.id] = homeFolder

const initialState = {
  allItems: allItems,
  currentFolderId: homeFolder.id
}

const createItem = (state, action) => {
  const newItemId = uuidv4()
  const parentId = action.parentId
  const newItem = {
    id: newItemId,
    name: action.name,
    isFolder: action.isFolder,
    parentId: parentId,
    childIds: []
  }

  const newState = Object.assign({}, state)
  const newAllItems = Object.assign({}, newState.allItems)
  const newParent = Object.assign({}, newAllItems[parentId])
  const newChildIds = newParent.childIds.slice()
  newChildIds.push(newItemId)
  newParent.childIds = newChildIds
  newAllItems[newItemId] = newItem
  newAllItems[parentId] = newParent
  newState.allItems = newAllItems
  return newState
}

const deleteItem = (state, action) => {
  const id = action.id
  const item = state.allItems[id]
  const parentId = item.parentId

  const newState = Object.assign({}, state)
  const newAllItems = Object.assign({}, newState.allItems)
  const newParent = Object.assign({}, newAllItems[parentId])
  const newChildIds = newParent.childIds
    .filter((childId) => { return childId != id })
    .map((childId) => { return childId })
  newParent.childIds = newChildIds
  delete newAllItems[id]
  newAllItems[parentId] = newParent
  newState.allItems = newAllItems
  return newState
}

const renameItem = (state, action) => {
  console.log(action)
  const id = action.id
  const name = action.name

  const newState = Object.assign({}, state)
  const newAllItems = Object.assign({}, newState.allItems)
  const newItem = Object.assign({}, newAllItems[id])
  newItem.name = name
  newAllItems[id] = newItem
  newState.allItems = newAllItems
  return newState
}

const gotoFolder = (state, action) => {
  const id = action.id

  const newState = Object.assign({}, state)
  newState.currentFolderId = id
  return newState
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_ITEM':
      return createItem(state, action)
    case 'DELETE_ITEM':
      return deleteItem(state, action)
    case 'RENAME_ITEM':
      return renameItem(state, action)
    case 'GOTO_FOLDER':
      return gotoFolder(state, action)
    default:
      return state
  }
}

export default reducer
