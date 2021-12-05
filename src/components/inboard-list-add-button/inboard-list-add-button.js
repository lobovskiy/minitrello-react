import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBoardList } from '../../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import AddForm from '../add-form';

const InboardListAddButton = ({ boardId, listNum }) => {
	const dispatch = useDispatch();
	
	// Создаем состояние listAddFormDisplay, определяющее отображение формы для добавления нового списка
	const [ listAddFormDisplay, toggleListAddFormDisplay ] = useState(false);

	// Если состояние listAddFormDisplay == false, то отображаем кнопку открытия формы,
	// на клик которой вешаем функцию переключения состояния listAddFormDisplay
	if (!listAddFormDisplay) {
		return (
			<button
				className="btn btn-primary bg-gradient container-fluid py-3"
				onClick={() => toggleListAddFormDisplay(!listAddFormDisplay)}
			>
				Добавить список
			</button>
		)
	}
	
	// Если же listAddFormDisplay == true, то отображаем форму добавления нового списка,
	// в качестве функции для submit передаем action создания списка, в которую форма подставит текст
	return (
		<div className="bg-light px-4 rounded">
			<div className="text-end pt-3">
				<span className="cursor-pointer" onClick={() => toggleListAddFormDisplay(!listAddFormDisplay)}>
					<FontAwesomeIcon icon={faTimes} size="lg" />
				</span>
			</div>
			<AddForm
				id="inboard-list__name"
				placeholder={`Список ${listNum}`}
				submitFunc={input => dispatch(addBoardList(input, boardId))}
			/>
		</div>
	)
}

export default InboardListAddButton;