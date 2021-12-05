import { useSelector, useDispatch } from 'react-redux';
import { toggleBoardAddFormDisplay, addBoard } from '../../actions';
import BoardAddButton from "../board-add-button";
import AddForm from "../add-form";
import './board-add-block.scss';

const BoardAddBlock = () => {
	const boardAddFormDisplay = useSelector(state => state.boardAddFormDisplay);
	const dispatch = useDispatch();

	const boardAddForm = !boardAddFormDisplay
		? null
		: <div className="col-6 add-form rounded mb-3 px-4 pb-3">
				<AddForm
					id="board__name"
					placeholder="Введите название"
					inputLabel="Название доски"
					submitFunc={input => dispatch(addBoard(input))}
					closeFormFunc={() => dispatch(toggleBoardAddFormDisplay())}
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

export default BoardAddBlock;