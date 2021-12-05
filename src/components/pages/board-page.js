import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import InboardList from '../inboard-list/inboard-list';
import InboardListAddButton from '../inboard-list-add-button/inboard-list-add-button';

const BoardPage = () => {
	const boards = useSelector(state => state.boards);
	const { boardId } = useParams();

	const board = boards.find(board => board.id === +boardId);

	const inboardLists = !board.lists.length
		? null
		: board.lists.map(list => <InboardList key={list.id} boardId={+boardId} list={list} />);


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
					<InboardListAddButton boardId={+boardId} listNum={board.lists.length + 1} />
				</Col>
			</Row>
		</>
	)
}

export default BoardPage;