import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addBoardList } from '../../actions';
import { Form, FormGroup, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './inboard-list-add-form.scss'

class InboardListAddForm extends Component {
	state = {
		text: ''
	}

	onUpdateText = event => {
		this.setState({text: event.target.value});
	}

	onSubmit = event => {
		event.preventDefault();
		this.props.addBoardList(this.state.text, this.props.boardId);
		this.setState({text: ''});
	}

	render() {
		const { listNum, closeFunc } = this.props;

		return (
			<Form className="add-list-form rounded" onSubmit={this.onSubmit}>
				<div className="text-end mb-3">
					<span className="btn" onClick={closeFunc}>
						<FontAwesomeIcon icon={faTimes} size="lg" />
					</span>
				</div>
				<FormGroup>
					<Input required type="name" name="name" id="inboardListName" placeholder={`Список ${listNum}`}
						onChange={this.onUpdateText}
						value={this.state.text} />
				</FormGroup>
			</Form>
		)
	}
}

const mapDispatchToProps = dispatch => bindActionCreators({ addBoardList }, dispatch);

export default connect(null, mapDispatchToProps)(InboardListAddForm);