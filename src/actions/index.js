export const createItem = (parentId, name, isFolder) => ({
  type: 'CREATE_ITEM',
  name: name,
  isFolder: isFolder,
  parentId: parentId
})

export const deleteItem = (id) => ({
  type: 'DELETE_ITEM',
  id: id
})

export const renameItem = (id, name) => ({
  type: 'RENAME_ITEM',
  id: id,
  name: name
})

export const gotoFolder = (id) => ({
  type: 'GOTO_FOLDER',
  id: id
})
