import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleBoardListItem } from '../../actions';

const InboardListItem = ({ boardId, listId, item, toggleBoardListItem }) => {
	const onToggleItem = () => {
		toggleBoardListItem(boardId, listId, item.id);
	}
	let className = "text-light text-start rounded mb-3 p-2";
	className += item.checked ? " bg-secondary" : " bg-danger";

	return (
		<li className={className}>
			{item.name}
			<span
			className="float-end cursor-pointer"
			onClick={onToggleItem}>
				<FontAwesomeIcon icon={faCheck} size="lg" />
			</span>
		</li>
	)
}

const mapDispatchToProps = dispatch => bindActionCreators({ toggleBoardListItem }, dispatch);

export default connect(null, mapDispatchToProps)(InboardListItem);