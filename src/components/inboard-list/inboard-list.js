import { useDispatch } from 'react-redux';
import { Col } from 'reactstrap';
import { addBoardListItem, dropItem } from '../../actions';
import InboardListItem from '../inboard-list-item';
import AddForm from '../add-form';

const InboardList = ({ boardId, list }) => {
	const dispatch = useDispatch();

	// При наличии элементов в массиве items внутри списка формируем список элементов,
	// сохраняем ID доски, списка и элемента
	const items = !list.items.length
		? null
		: <ul className="p-0 m-0">
				{ list.items.map(item => {
					return (
						<InboardListItem
							key={item.id}
							boardId={boardId}
							listId={list.id}
							item={item}
						/>
					)
				})}
			</ul>;

	// Создаем обработчики для сброса перетаскиваемого элемента списка прямо в список
	// (не на место другого конкретного элемента, в т.ч. в пустой список)

	function dragOverHandler(e) {
		e.preventDefault();
		if (e.target && !e.target.matches('li.item')) {
			e.currentTarget.style.outline = '4px solid #0d6efd';
		}
	}

	function dragLeaveHandler(e) {
		e.currentTarget.style.outline = 'none';
	}

	function dragEndHandler(e) {
		e.currentTarget.style.outline = 'none';
	}

	// При сбросе элемента на список, но не на другой элемент, выполняем action dropItem, передавая в reducer
	// только ID элемента - в этом случае reducer будет добавлять элемент просто в конец списка
	function dropItemHandler(e, listId) {
		e.preventDefault();
		e.currentTarget.style.outline = 'none';
		if (e.target && !e.target.matches('li.item')) {
			dispatch(dropItem(listId));
		}
	}

	// Отображаем список с названием, формой добаления элемента и существующими элементами,
	// в форму в качестве функции для submit передаем action создания элемента, в которую форма подставит текст
	return (
		<Col className="col-3 mb-3">
			<div
				onDragOver={(e) => dragOverHandler(e)}
				onDragLeave={(e) => dragLeaveHandler(e)}
				onDragEnd={(e) => dragEndHandler(e)}
				onDrop={(e) => dropItemHandler(e, list.id)}
				className="list bg-light rounded px-4 pt-3 pb-2"
			>
				<h4>{list.name}</h4>
				<AddForm
					id="inboard-list-item__name"
					submitFunc={input => dispatch(addBoardListItem(input, boardId, list.id))}
				/>
				{items}
			</div>
		</Col>
	)
}

export default InboardList;