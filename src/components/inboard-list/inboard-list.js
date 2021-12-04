import { Col, Form, FormGroup, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addBoardListItem } from '../../actions';
import InboardListItem from '../inboard-list-item';

const InboardList = ({ boardId, list, addBoardListItem }) => {
	const handleSubmit = event => {
		event.preventDefault();
		addBoardListItem(event.target.querySelector('input').value, boardId, list.id);
		event.target.reset();
	}

	const items = !list.items.length
		? null
		: list.items.map(item => <InboardListItem key={item.id} boardId={boardId} listId={list.id} item={item} />)

	return (
		<Col className="col-3 mb-3">
			<div className="bg-light rounded px-4 py-2">
				<h4>{list.name}</h4>
				<Form className="add-list-item-form rounded" onSubmit={handleSubmit}>
					<FormGroup>
						<Input required type="name" name="name" id="inboardListName" />
					</FormGroup>
				</Form>
				<ul className="p-0">{items}</ul>
			</div>
		</Col>
	)
}

const mapDispatchToProps = dispatch => bindActionCreators({ addBoardListItem }, dispatch);

export default connect(null, mapDispatchToProps)(InboardList);