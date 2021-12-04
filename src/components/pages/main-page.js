import RowBlock from '../row-block';
import BoardAddBlock from '../board-add-block';
import BoardsList from '../boards-list';

const MainPage = () => {
	return (
		<RowBlock left={<BoardAddBlock/>} right={<BoardsList/>} />
	)
}

export default MainPage;