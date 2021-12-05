import { Col } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addBoardListItem, dropItem } from '../../actions';
import InboardListItem from '../inboard-list-item';
import AddForm from '../add-form';

const InboardList = ({ boardId, list, addBoardListItem, dropItem }) => {

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

	function dropItemHandler(e, listId) {
		e.preventDefault();
		e.currentTarget.style.outline = 'none';
		if (e.target && !e.target.matches('li.item')) {
			dropItem(listId);
		}
	}

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
					id="inboardListItemName"
					submitFunc={addBoardListItem}
					submitArguments={[boardId, list.id]}
				/>
				{items}
			</div>
		</Col>
	)
}

const mapDispatchToProps = dispatch => bindActionCreators({ addBoardListItem, dropItem }, dispatch);

export default connect(null, mapDispatchToProps)(InboardList);