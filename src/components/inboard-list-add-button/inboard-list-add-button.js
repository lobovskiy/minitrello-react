import { useState } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addBoardList } from '../../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import AddForm from '../add-form';

const InboardListAddButton = ({ boardId, listNum, addBoardList }) => {
	
	const [ listAddFormDisplay, toggleListAddFormDisplay ] = useState(false);
	const onToggleListAddFormDisplay = () => toggleListAddFormDisplay(!listAddFormDisplay);

	if (!listAddFormDisplay) {
		return (
			<button
				className="btn btn-primary container-fluid py-3"
				onClick={onToggleListAddFormDisplay}>
					Добавить список
			</button>
		)
	}
	
	return (
		<div className="bg-light px-4 rounded">
			<div className="text-end pt-3">
				<span className="cursor-pointer" onClick={onToggleListAddFormDisplay}>
					<FontAwesomeIcon icon={faTimes} size="lg" />
				</span>
			</div>
			<AddForm
				id="inboardListName"
				placeholder={`Список ${listNum}`}
				submitFunc={addBoardList}
				submitArguments={[boardId]}
			/>
		</div>
	)
}

const mapDispatchToProps = dispatch => bindActionCreators({ addBoardList }, dispatch);

export default connect(null, mapDispatchToProps)(InboardListAddButton);