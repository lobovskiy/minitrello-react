import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { toggleBoardListItem, setDraggedId, dropItem } from '../../actions';

const InboardListItem = ({ boardId, listId, item }) => {
	const dispatch = useDispatch();

	// Присваиваем элементу класс в зависимости от свойства checked объекта элемента
	let className = "item text-light text-start rounded mb-3 p-2 cursor-grab";
	className += item.checked ? " bg-secondary" : " bg-danger";

	// Создаем обработчики для перетаскивания элемента с визуальными эффектами

	function dragOverHandler(e) {
		e.preventDefault();
		if (e.target && e.target.matches('li.item')) {
			e.target.style.boxShadow = '0 4px 3px gray';
		}
	}

	function dragLeaveHandler(e) {
		e.target.style.boxShadow = 'none';
	}

	// При начале перетаскивания элемента записываем в state.draggedId ID его доски,
	// списка и его самого при помощи action-функции setDraggedId
	function dragStartHandler(e, boardId, listId, itemId) {
		dispatch(setDraggedId(boardId, listId, itemId));
	}

	function dragEndHandler(e) {
		e.target.style.boxShadow = 'none';
	}

	// При сбросе элемента на другой элемент выполняем action dropItem,
	// передавая в reducer ID списка и элемента, на которые был выполнен сброс
	function dropHandler(e, listId, itemId) {
		e.preventDefault();
		e.target.style.boxShadow = 'none';
		if (e.target && e.target.matches('li.item')) {
			dispatch(dropItem(listId, itemId));
		}
	}

	// Отображаем элементы с action-функциями переключения свойства checked элемента,
	// навешиваем их на клик иконки галочки внутри элемента
	return (
		<li
			onDragOver={(e) => dragOverHandler(e)}
			onDragLeave={(e) => dragLeaveHandler(e)}
			onDragStart={(e) => dragStartHandler(e, boardId, listId, item.id)}
			onDragEnd={(e) => dragEndHandler(e)}
			onDrop={(e) => dropHandler(e, listId, item.id)}
			className={className}
			draggable
		>
			{item.name}
			<span
				className="float-end cursor-pointer"
				onClick={() => dispatch(toggleBoardListItem(boardId, listId, item.id))}
			>
				<FontAwesomeIcon icon={faCheck} size="lg" />
			</span>
		</li>
	)
}

export default InboardListItem;