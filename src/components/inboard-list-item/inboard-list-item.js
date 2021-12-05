import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleBoardListItem, setDraggedId, dropItem } from '../../actions';

const InboardListItem = ({ boardId, listId, item, toggleBoardListItem, setDraggedId, dropItem }) => {
	const onToggleItem = () => {
		toggleBoardListItem(boardId, listId, item.id);
	}
	let className = "item text-light text-start rounded mb-3 p-2 cursor-grab";
	className += item.checked ? " bg-secondary" : " bg-danger";

	function dragOverHandler(e) {
		e.preventDefault();
		if (e.target && e.target.matches('li.item')) {
			e.target.style.boxShadow = '0 4px 3px gray';
		}
	}

	function dragLeaveHandler(e) {
		e.target.style.boxShadow = 'none';
	}

	function dragStartHandler(e, boardId, listId, itemId) {
		setDraggedId(boardId, listId, itemId);
	}

	function dragEndHandler(e) {
		e.target.style.boxShadow = 'none';
	}

	function dropHandler(e, listId, itemId) {
		e.preventDefault();
		e.target.style.boxShadow = 'none';
		if (e.target && e.target.matches('li.item')) {
			dropItem(listId, itemId);
		}
	}

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
			onClick={onToggleItem}>
				<FontAwesomeIcon icon={faCheck} size="lg" />
			</span>
		</li>
	)
}

const mapDispatchToProps = dispatch => bindActionCreators({ toggleBoardListItem, setDraggedId, dropItem }, dispatch);

export default connect(null, mapDispatchToProps)(InboardListItem);