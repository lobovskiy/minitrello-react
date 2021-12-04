import React, { Component } from 'react';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';

export default class AddForm extends Component {
	state = {
		text: ''
	}

	onUpdateText = event => {
		this.setState({text: event.target.value});
	}

	onSubmit = event => {
		const { submitFunc, submitArguments, closeFormFunc } = this.props;
		event.preventDefault();
		submitArguments
			? submitFunc(this.state.text, ...submitArguments)
			: submitFunc(this.state.text);
		this.setState({text: ''});
		if (closeFormFunc) closeFormFunc();
	}

	render() {
		const { id = "", placeholder = "", inputLabel, submitButton, closeFormFunc } = this.props;
		const label = inputLabel
			? <Label for={id} className="container-fluid text-start p-0">{inputLabel}</Label>
			: null;
		const buttons = submitButton
			? <div className="clearfix">
					<Button type="button" className="btn btn-secondary col-4 float-start" onClick={closeFormFunc}>Отмена</Button>
					<Button type="submit" className="btn btn-success col-7 float-end">{submitButton}</Button>
				</div>
			: null;

		return (
			<Form className="bg-light py-2 rounded" onSubmit={this.onSubmit}>
				<FormGroup>
					{label}
					<Input required type="name" name="name" id={id} placeholder={placeholder}
						onChange={this.onUpdateText}
						value={this.state.text} />
				</FormGroup>
				{buttons}
			</Form>
		)
	}
}