import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleBoardAddFormDisplay, addBoard } from '../../actions';
import BoardAddButton from "../board-add-button";
import AddForm from "../add-form";
import './board-add-block.scss';

const BoardAddBlock = ({ boardAddFormDisplay, toggleBoardAddFormDisplay, addBoard }) => {
	const boardAddForm = !boardAddFormDisplay
		? null
		: <div className="col-6 add-form rounded mb-3 px-4 pb-3">
				<AddForm
					id="inboardListItemName"
					inputLabel="Название доски"
					submitFunc={addBoard}
					closeFormFunc={toggleBoardAddFormDisplay}
					submitButton="Сохранить"
				/>
			</div>;

	return (
		<>
			<BoardAddButton />
			{boardAddForm}
		</>
	)
}

const mapStateToProps = ({ boardAddFormDisplay }) => ({ boardAddFormDisplay });
const mapDispatchToProps = dispatch => bindActionCreators({ toggleBoardAddFormDisplay, addBoard }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BoardAddBlock);