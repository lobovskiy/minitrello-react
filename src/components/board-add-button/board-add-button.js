import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleBoardAddFormDisplay } from '../../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import './board-add-button.scss';

const BoardAddButton = ({ boardAddFormDisplay, toggleBoardAddFormDisplay }) => {
	let buttonClass = "col-6 btn btn-success btn-lg btn-add-form"
	if (boardAddFormDisplay) buttonClass+= " btn-inactive";
	const toggleFunc = !boardAddFormDisplay ? () => toggleBoardAddFormDisplay() : () => {};
	const closeIcon = boardAddFormDisplay ? <FontAwesomeIcon icon={faTimes} size="lg" /> : null;

	return (
		<button
		className={buttonClass}
		onClick={toggleFunc}>
			<FontAwesomeIcon icon={faPlus} size="lg" />	Новая доска
			<span
			className="btn-add-form__icon"
			onClick={() => toggleBoardAddFormDisplay()}>
				{closeIcon}
			</span>
		</button>
	)
}

const mapStateToProps = ({ boardAddFormDisplay }) => ({ boardAddFormDisplay });
const mapDispatchToProps = dispatch => bindActionCreators({ toggleBoardAddFormDisplay }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BoardAddButton);