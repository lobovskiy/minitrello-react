const toggleBoardAddFormDisplay = () => ({ type: 'TOGGLE_BOARD_ADD_FORM_DISPLAY' });
const addBoard = boardName => ({ type: 'ADD_BOARD', payload: boardName });
const addBoardList = (boardListName, boardId) => {
	return {
		type: 'ADD_BOARD_LIST',
		payload: { boardListName, boardId }
	}
};
const addBoardListItem = (boardListItemName, boardId, boardListId) => {
	return {
		type: 'ADD_BOARD_LIST_ITEM',
		payload: { boardListItemName, boardId, boardListId }
	}
};
const toggleBoardListItem = (boardId, boardListId, boardListItemId) => {
	return {
		type: 'TOGGLE_BOARD_LIST_ITEM',
		payload: { boardId, boardListId, boardListItemId }
	}
};
const setDraggedId = (boardId, boardListId, boardListItemId) => {
	return {
		type: 'SET_DRAGGED_ID',
		payload: { boardId, boardListId, boardListItemId }
	}
};
const dropItem = (boardListId, boardListItemId) => {
	return {
		type: 'DROP_ITEM',
		payload: { boardListId, boardListItemId }
	}
};

export {
	toggleBoardAddFormDisplay,
	addBoard,
	addBoardList,
	addBoardListItem,
	toggleBoardListItem,
	setDraggedId,
	dropItem
}