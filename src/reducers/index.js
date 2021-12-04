const initialState = {
	boards: [],
	boardAddFormDisplay: false
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'TOGGLE_BOARD_ADD_FORM_DISPLAY':
			return {
				...state,
				boardAddFormDisplay: !state.boardAddFormDisplay
			};
		case 'ADD_BOARD':
			return {
				...state,
				boards: [
					...state.boards,
					{
						id: state.boards.length + 1,
						name: action.payload,
						lists: []
					}
				]
			};
		case 'ADD_BOARD_LIST': {
			const boardIndex = state.boards.findIndex(board => board.id == action.payload.boardId);
			const updatingBoard = { ...state.boards[boardIndex] };
			const newList = {
				id: updatingBoard.lists.length + 1,
				name: action.payload.boardListName,
				items: []
			}
			updatingBoard.lists.push(newList);
			const newData = [
				...state.boards.slice(0, boardIndex),
				updatingBoard,
				...state.boards.slice(boardIndex + 1)
			];
			return {
				...state,
				boards: newData
			};
		}
		case 'ADD_BOARD_LIST_ITEM': {
			const { payload } = action;
			const boardIndex = state.boards.findIndex(board => board.id == payload.boardId);
			const updatingBoard = { ...state.boards[boardIndex] };
			const boardListIndex = updatingBoard.lists.findIndex(list => list.id == payload.boardListId);
			const updatingList = { ...updatingBoard.lists[boardListIndex] };
			
			const newItem = {
				id: updatingList.items.length + 1,
				name: payload.boardListItemName,
				checked: false
			}
			updatingList.items.push(newItem);

			updatingBoard.lists = [
				...updatingBoard.lists.slice(0, boardListIndex),
				updatingList,
				...updatingBoard.lists.slice(boardListIndex + 1)
			]
			const newData = [
				...state.boards.slice(0, boardIndex),
				updatingBoard,
				...state.boards.slice(boardIndex + 1)
			];
			return {
				...state,
				boards: newData
			};
		}
		case 'TOGGLE_BOARD_LIST_ITEM': {
			const { payload } = action;
			const boardIndex = state.boards.findIndex(board => board.id == payload.boardId);
			const updatingBoard = { ...state.boards[boardIndex] };
			const boardListIndex = updatingBoard.lists.findIndex(list => list.id == payload.boardListId);
			const updatingList = { ...updatingBoard.lists[boardListIndex] };
			const boardListItemIndex = updatingList.items.findIndex(item => item.id == payload.boardListItemId);
			const updatingItem = { ...updatingList.items[boardListItemIndex] };
			updatingItem.checked = !updatingItem.checked;

			updatingList.items = [
				...updatingList.items.slice(0, boardListItemIndex),
				updatingItem,
				...updatingList.items.slice(boardListItemIndex + 1)
			]
			updatingBoard.lists = [
				...updatingBoard.lists.slice(0, boardListIndex),
				updatingList,
				...updatingBoard.lists.slice(boardListIndex + 1)
			]
			const newData = [
				...state.boards.slice(0, boardIndex),
				updatingBoard,
				...state.boards.slice(boardIndex + 1)
			];
			return {
				...state,
				boards: newData
			};
		}
		default:
			return state;
	}
};

export default reducer;