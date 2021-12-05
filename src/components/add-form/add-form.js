import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';

export default class AddForm extends Component {
	state = {
		text: ''
	}

	// Проверяем переданные в props функции по типу с помощью prop-types
	static propTypes = {
		submitFunc: PropTypes.func,
		closeFunc: PropTypes.func
	}

	// Обработчик для синхронизации текста в state с текстом в input
	updateTextHandler = event => {
		this.setState({text: event.target.value});
	}

	// По событию submit формы возвращаем текст из state в переданную функцию submitFunc,
	// затем очищаем state и выполняем закрывающую функцию при ее наличии
	submitHandler = event => {
		const { submitFunc, closeFunc } = this.props;
		event.preventDefault();
		submitFunc(this.state.text);
		this.setState({text: ''});
		if (closeFunc) closeFunc();
	}

	render() {
		const { id = "", placeholder = "", inputLabel, submitButton, closeFunc } = this.props;
		
		// Если в props передан label, то задаем его
		const label = inputLabel
			? <Label for={id} className="container-fluid text-start p-0">{inputLabel}</Label>
			: null;

		// Если передан текст кнопки Submit, то рисуем кнопки Сохранить и Отмена (стили задал жестко),
		// вешаем на их клики переданные функции для submit и для отмены
		const buttons = submitButton
			? <div className="clearfix">
					<Button type="button" className="btn btn-secondary col-4 float-start" onClick={closeFunc}>Отмена</Button>
					<Button type="submit" className="btn btn-success col-7 float-end">{submitButton}</Button>
				</div>
			: null;

		// Возвращаем форму с переданными (при наличии) label и кнопками
		return (
			<Form className="py-2 rounded" onSubmit={this.submitHandler}>
				<FormGroup>
					{label}
					<Input
						required type="name" name="name"
						id={id}
						placeholder={placeholder}
						onChange={this.updateTextHandler}
						value={this.state.text}
					/>
				</FormGroup>
				{buttons}
			</Form>
		)
	}
}