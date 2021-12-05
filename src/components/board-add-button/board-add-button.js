import { useSelector, useDispatch } from 'react-redux';
import { toggleBoardAddFormDisplay } from '../../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

const BoardAddButton = () => {
	const boardAddFormDisplay = useSelector(state => state.boardAddFormDisplay);
	const dispatch = useDispatch();

	// В зависимости от значения boardAddFormDisplay в state:
	// добавляем класс кнопке, назначаем на кнопку action-функцию переключения boardAddFormDisplay
	// или пустую функцию, отображаем/скрываем иконку закрытия формы
	let buttonClass = "col-6 btn btn-success btn-lg text-start px-4";
	boardAddFormDisplay
		? buttonClass+= " btn-inactive"
		: buttonClass+= " bg-gradient";
	const toggleFunc = !boardAddFormDisplay ? () => dispatch(toggleBoardAddFormDisplay()) : () => {};
	const closeIcon = boardAddFormDisplay ? <FontAwesomeIcon icon={faTimes} size="lg" /> : null;

	// На иконку закрытия формы также вешаем action переключения boardAddFormDisplay
	return (
		<button
			className={buttonClass}
			onClick={toggleFunc}
		>
			<FontAwesomeIcon icon={faPlus} size="lg" /> Новая доска
			<span
				className="float-end cursor-pointer"
				onClick={() => dispatch(toggleBoardAddFormDisplay())}
			>
				{closeIcon}
			</span>
		</button>
	)
}

export default BoardAddButton;