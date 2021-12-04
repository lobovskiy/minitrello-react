import { useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import InboardListAddForm from '../inboard-list-add-form';
import InboardList from '../inboard-list/inboard-list';

const BoardPage = ({ boards }) => {
	const [ listAddFormDisplay, toggleListAddFormDisplay ] = useState(false);
	const onToggleListAddFormDisplay = () => toggleListAddFormDisplay(!listAddFormDisplay);
	const { boardId } = useParams();
	const board = boards.find(board => board.id === +boardId);

	const inboardLists = !board.lists.length
		? null
		: board.lists.map(list => <InboardList key={list.id} boardId={boardId} list={list} />);

	const listAddSection = listAddFormDisplay
		? <InboardListAddForm boardId={boardId} listNum={board.lists.length + 1} closeFunc={onToggleListAddFormDisplay} />
		: <button
				className="btn btn-primary container-fluid py-3"
				onClick={onToggleListAddFormDisplay}>
					Добавить список
			</button>;

	return (
		<>
			<Row className="mb-4">
				<Col md='4'>
					<h2 className="bg-success text-light rounded py-4">{board.name}</h2>
				</Col>
			</Row>
			<Row className="mb-3">
				{inboardLists}
				<Col className="col-3 text-start">
					{listAddSection}
				</Col>
			</Row>
		</>
	)
}

const mapStateToProps = ({ boards }) => ({ boards })

export default connect(mapStateToProps)(BoardPage);