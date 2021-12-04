import { Col } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addBoardListItem } from '../../actions';
import InboardListItem from '../inboard-list-item';
import AddForm from '../add-form';

const InboardList = ({ boardId, list, addBoardListItem }) => {

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

	return (
		<Col className="col-3 mb-3">
			<div className="bg-light rounded px-4 py-2">
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

const mapDispatchToProps = dispatch => bindActionCreators({ addBoardListItem }, dispatch);

export default connect(null, mapDispatchToProps)(InboardList);