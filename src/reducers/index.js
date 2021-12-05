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

		// Переключение видимости формы для добавления доски
		case 'TOGGLE_BOARD_ADD_FORM_DISPLAY':
			return {
				...state,
				boardAddFormDisplay: !state.boardAddFormDisplay
			};

		// Добавление новой доски
		case 'ADD_BOARD':
			
		// Проверяем на совпадение по имени с уже существующими досками
			if (state.boards.findIndex(board => board.name === action.payload) >= 0) {
				alert("Доска с таким именем уже существует! Введите другое название.");
				return {...state};
			}
			
			// Добавляем в state.boards объект новой доски
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

		// Добавление нового списка на доску
		case 'ADD_BOARD_LIST': {
			
			// Ищем изменяемую доску по ее ID и сохраняем ее свойства в переменную
			const boardIndex = state.boards.findIndex(board => board.id === action.payload.boardId);
			const updatingBoard = { ...state.boards[boardIndex] };
			
			// Создаем объект нового списка и вставляем в конец массива lists изменяемой доски
			const newList = {
				id: updatingBoard.lists.length + 1,
				name: action.payload.boardListName,
				items: []
			}
			updatingBoard.lists.push(newList);

			// Создаем массив досок с обновленной доской и возвращаем в state
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

		// Добавление нового элемента в список
		case 'ADD_BOARD_LIST_ITEM': {
			const { payload } = action;

			// Ищем и сохраняем изменяемую доску
			const boardIndex = state.boards.findIndex(board => board.id === payload.boardId);
			const updatingBoard = { ...state.boards[boardIndex] };

			// Ищем и сохраняем изменяемый список
			const boardListIndex = updatingBoard.lists.findIndex(list => list.id === payload.boardListId);
			const updatingList = { ...updatingBoard.lists[boardListIndex] };
			
			// Создаем объект нового элемента и вставляем в начало массива items изменяемого списка
			const newItem = {
				id: updatingList.items.length + 1,
				name: payload.boardListItemName,
				checked: false
			}
			updatingList.items.splice(0, 0, newItem);

			// Создаем массив списков с обновленным списком в изменяемой доске
			updatingBoard.lists = [
				...updatingBoard.lists.slice(0, boardListIndex),
				updatingList,
				...updatingBoard.lists.slice(boardListIndex + 1)
			]

			// Создаем массив досок с обновленной доской и возвращаем в state
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

		// Переключение свойства checked (активация/деактивация) элемента
		case 'TOGGLE_BOARD_LIST_ITEM': {
			const { payload } = action;

			// Ищем и сохраняем изменяемую доску
			const boardIndex = state.boards.findIndex(board => board.id === payload.boardId);
			const updatingBoard = { ...state.boards[boardIndex] };

			// Ищем и сохраняем изменяемый список
			const boardListIndex = updatingBoard.lists.findIndex(list => list.id === payload.boardListId);
			const updatingList = { ...updatingBoard.lists[boardListIndex] };

			// Ищем изменяемый элемент и переключаем ему свойство checked
			const boardListItemIndex = updatingList.items.findIndex(item => item.id === payload.boardListItemId);
			const updatingItem = { ...updatingList.items[boardListItemIndex] };
			updatingItem.checked = !updatingItem.checked;

			// Создаем массив элементов с обновленным элементом в изменяемом списке
			updatingList.items = [
				...updatingList.items.slice(0, boardListItemIndex),
				updatingItem,
				...updatingList.items.slice(boardListItemIndex + 1)
			]

			// Создаем массив списков с обновленным списком в изменяемой доске
			updatingBoard.lists = [
				...updatingBoard.lists.slice(0, boardListIndex),
				updatingList,
				...updatingBoard.lists.slice(boardListIndex + 1)
			]

			// Создаем массив досок с обновленной доской и возвращаем в state
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

		// В state.draggedId сохраняем ID доски, списка элемента и самого элемента,
		// переданные при начале перетаскивания этого элемента
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

		// Перетаскивание элемента
		case 'DROP_ITEM': {
			const { payload } = action;

			// Ищем и сохраняем изменяемую доску
			const boardIndex = state.boards.findIndex(board => board.id === state.draggedId.board);
			const updatingBoard = { ...state.boards[boardIndex] };

			// Ищем и сохраняем изменяемый список, из которого был перемещен элемент
			const draggedListIndex = updatingBoard.lists.findIndex(list => list.id === state.draggedId.list);
			const draggedList = { ...updatingBoard.lists[draggedListIndex] };

			// Ищем и сохраняем перетаскиваемый элемент
			const draggedItemIndex = draggedList.items.findIndex(item => item.id === state.draggedId.item);
			const draggedItem = { ...draggedList.items[draggedItemIndex] };

			// Ищем и сохраняем изменяемый список, в который был сброшен элемент
			const currentListIndex = updatingBoard.lists.findIndex(list => list.id === payload.boardListId);
			const currentList = { ...updatingBoard.lists[currentListIndex] };

			// Ищем индекс элемента, на место которого был сброшен перетаскиваемый элемент
			const currentItemIndex = currentList.items.findIndex(item => item.id === payload.boardListItemId);
			
			// Изменяем массивы элементов. Изменяем отдельным способом,
			// если элемент перетаскивается внутри одного списка вниз, ниже ближайшего соседа
			if (draggedListIndex === currentListIndex && draggedItemIndex - currentItemIndex < -1) {
				currentList.items.splice(draggedItemIndex, 1);
				currentList.items.splice(currentItemIndex - 1, 0, draggedItem);
			} else {
				// В остальных случаях вырезаем элемент из одного списка и вставляем в другой
				draggedList.items.splice(draggedItemIndex, 1);
				// Если не передан индекс элемента, на место которого сброшен перетаскиваемый,
				// то вставляем перетаскиваемый элемент просто в конец списка
				currentItemIndex === -1
					? currentList.items.push(draggedItem)
					: currentList.items.splice(currentItemIndex, 0, draggedItem)
			}

			// Пересчитываем ID у элементов списка, куда сброшен элемент
			// (при работе с сервером лучше предусмотреть у элементов отдельное свойство для сортировки)
			for (let i = 0; i < currentList.items.length; i++) {
				updatingBoard.lists[currentListIndex].items[i].id = i + 1;
			}

			// Если элемент был перемещен между разными списками, то пересчитываем ID и у элементов списка,
			// из которого элемент был перемещен
			if (draggedListIndex !== currentListIndex) {
				for (let i = 0; i < draggedList.items.length; i++) {
					updatingBoard.lists[draggedListIndex].items[i].id = i + 1;
				}
			}

			// Создаем массив списков с обновленным списком (в который был сброшен элемент) в изменяемой доске
			updatingBoard.lists = [
				...updatingBoard.lists.slice(0, currentListIndex),
				currentList,
				...updatingBoard.lists.slice(currentListIndex + 1)
			]

			// Если элемент был перемещен между разными списками, то обновляем в массиве списков
			// также список, из которого был удален элемент
			if (draggedListIndex !== currentListIndex) {
				updatingBoard.lists = [
					...updatingBoard.lists.slice(0, draggedListIndex),
					draggedList,
					...updatingBoard.lists.slice(draggedListIndex + 1)
				]
			}

			// Создаем массив досок с обновленной доской и возвращаем в state
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