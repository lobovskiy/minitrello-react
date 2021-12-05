const initialState = {
	boards: [],
	boardAddFormDisplay: false,
	draggedId: {
		board: null,
		list: null,
		item: null
	}
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'TOGGLE_BOARD_ADD_FORM_DISPLAY':
			return {
				...state,
				boardAddFormDisplay: !state.boardAddFormDisplay
			};
		case 'ADD_BOARD':
			if (state.boards.findIndex(board => board.name === action.payload) >= 0) {
				alert("Доска с таким именем уже существует! Введите другое название.");
				return {...state};
			}
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
			const boardIndex = state.boards.findIndex(board => board.id === action.payload.boardId);
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
			const boardIndex = state.boards.findIndex(board => board.id === payload.boardId);
			const updatingBoard = { ...state.boards[boardIndex] };
			const boardListIndex = updatingBoard.lists.findIndex(list => list.id === payload.boardListId);
			const updatingList = { ...updatingBoard.lists[boardListIndex] };
			
			const newItem = {
				id: updatingList.items.length + 1,
				name: payload.boardListItemName,
				checked: false
			}
			updatingList.items.splice(0, 0, newItem);

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
			const boardIndex = state.boards.findIndex(board => board.id === payload.boardId);
			const updatingBoard = { ...state.boards[boardIndex] };
			const boardListIndex = updatingBoard.lists.findIndex(list => list.id === payload.boardListId);
			const updatingList = { ...updatingBoard.lists[boardListIndex] };
			const boardListItemIndex = updatingList.items.findIndex(item => item.id === payload.boardListItemId);
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
		case 'SET_DRAGGED_ID':
			const { payload } = action;
			return {
				...state,
				draggedId: {
					board: payload.boardId,
					list: payload.boardListId,
					item: payload.boardListItemId
				}
			};
		case 'DROP_ITEM': {
			const { payload } = action;
			const boardIndex = state.boards.findIndex(board => board.id === state.draggedId.board);
			const updatingBoard = { ...state.boards[boardIndex] };

			const draggedListIndex = updatingBoard.lists.findIndex(list => list.id === state.draggedId.list);
			const draggedList = { ...updatingBoard.lists[draggedListIndex] };

			const draggedItemIndex = draggedList.items.findIndex(item => item.id === state.draggedId.item);
			const draggedItem = { ...draggedList.items[draggedItemIndex] };

			const currentListIndex = updatingBoard.lists.findIndex(list => list.id === payload.boardListId);
			const currentList = { ...updatingBoard.lists[currentListIndex] };

			const currentItemIndex = currentList.items.findIndex(item => item.id === payload.boardListItemId);
						
			if (draggedListIndex === currentListIndex && draggedItemIndex - currentItemIndex < -1) {
				currentList.items.splice(draggedItemIndex, 1);
				currentList.items.splice(currentItemIndex - 1, 0, draggedItem);
			} else {
				draggedList.items.splice(draggedItemIndex, 1);
				currentItemIndex === -1
					? currentList.items.push(draggedItem)
					: currentList.items.splice(currentItemIndex, 0, draggedItem)
			}

			for (let i = 0; i < currentList.items.length; i++) {
				updatingBoard.lists[currentListIndex].items[i].id = i + 1;
			}

			for (let i = 0; i < draggedList.items.length; i++) {
				updatingBoard.lists[draggedListIndex].items[i].id = i + 1;
			}

			updatingBoard.lists = [
				...updatingBoard.lists.slice(0, currentListIndex),
				currentList,
				...updatingBoard.lists.slice(currentListIndex + 1)
			]
			updatingBoard.lists = [
				...updatingBoard.lists.slice(0, draggedListIndex),
				draggedList,
				...updatingBoard.lists.slice(draggedListIndex + 1)
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