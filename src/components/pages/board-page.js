import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import InboardList from '../inboard-list/inboard-list';
import InboardListAddButton from '../inboard-list-add-button/inboard-list-add-button';

const BoardPage = () => {
	const boards = useSelector(state => state.boards);
	
	// получаем доску по ее ID из параметров роутера
	const { boardId } = useParams();
	const board = boards.find(board => board.id === +boardId);

	// При наличии списков в массиве lists внутри доски отображаем списки компонентами InboardList.
	// Сохраняем им в props ID доски и объект с содержимым списка
	const inboardLists = !board.lists.length
		? null
		: board.lists.map(list => <InboardList key={list.id} boardId={+boardId} list={list} />);

	// После списков отображаем кнопку добавления нового списка,
	// также сохраняем ID доски и количество существующих списков (для счетчика в плэйсхолдере)
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