import { useSelector, useDispatch } from 'react-redux';
import { toggleBoardAddFormDisplay, addBoard } from '../../actions';
import BoardAddButton from "../board-add-button";
import AddForm from "../add-form";
import './board-add-block.scss';

const BoardAddBlock = () => {
	// Используем хуки для связи с Redux store
	const boardAddFormDisplay = useSelector(state => state.boardAddFormDisplay);
	const dispatch = useDispatch();

	// Задаем отображение формы добавления доски по значению свойства boardAddFormDisplay в state.
	// В форму в качестве функции для submit передаем action создания доски, в которую форма подставит текст,
	// и в качестве функции отмены передаем action переключения boardAddFormDisplay
	const boardAddForm = !boardAddFormDisplay
		? null
		: <div className="col-6 add-form rounded mb-3 px-4 pb-3">
				<AddForm
					id="board__name"
					placeholder="Введите название"
					inputLabel="Название доски"
					submitFunc={input => dispatch(addBoard(input))}
					closeFunc={() => dispatch(toggleBoardAddFormDisplay())}
					submitButton="Сохранить"
				/>
			</div>;

	// Отображаем кнопку открытия формы и саму форму, если boardAddFormDisplay == true
	return (
		<>
			<BoardAddButton />
			{boardAddForm}
		</>
	)
}

export default BoardAddBlock;