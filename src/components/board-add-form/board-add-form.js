import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleBoardAddFormDisplay, addBoard } from '../../actions';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './board-add-form.scss'

const BoardAddForm = ({ toggleBoardAddFormDisplay, addBoard }) => {
	const handleSubmit = event => {
		event.preventDefault();
		addBoard(event.target.querySelector('input').value);
		event.target.reset();
		toggleBoardAddFormDisplay();
	}
	
	return (
		<Form className="col-6 add-form rounded mb-3" onSubmit={handleSubmit}>
			<FormGroup>
				<Label for="boardName" className="container-fluid text-start p-0">Название доски</Label>
				<Input required type="name" name="name" id="boardName" placeholder="Моя доска" />
			</FormGroup>
			<div className="clearfix">
				<Button type="button" className="btn btn-secondary col-4 float-start" onClick={() => toggleBoardAddFormDisplay()}>Отмена</Button>
				<Button type="submit" className="btn btn-success col-7 float-end">Сохранить</Button>
			</div>
		</Form>
	)
}

const mapDispatchToProps = dispatch => bindActionCreators({ toggleBoardAddFormDisplay, addBoard }, dispatch);

export default connect(null, mapDispatchToProps)(BoardAddForm);