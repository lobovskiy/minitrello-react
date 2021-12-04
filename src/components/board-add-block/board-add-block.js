import { connect } from 'react-redux';
import BoardAddButton from "../board-add-button";
import BoardAddForm from "../board-add-form";

const BoardAddBlock = ({ boardAddFormDisplay }) => {
	const boardAddForm = boardAddFormDisplay ? <BoardAddForm /> : null;

	return (
		<>
			<BoardAddButton />
			{boardAddForm}
		</>
	)
}

const mapStateToProps = ({ boardAddFormDisplay }) => ({ boardAddFormDisplay });

export default connect(mapStateToProps)(BoardAddBlock);