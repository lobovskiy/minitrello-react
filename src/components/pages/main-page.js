import RowBlock from '../row-block';
import BoardAddBlock from '../board-add-block';
import BoardsList from '../boards-list';

// На главной разносим отображение компонентов по левой и правой частям при помощи RowBlock
const MainPage = () => {
	return (
		<RowBlock left={<BoardAddBlock/>} right={<BoardsList/>} />
	)
}

export default MainPage;