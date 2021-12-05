import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './boards-list.scss'

const BoardsList = () => {
	const boards = useSelector(state => state.boards);

	// При наличии досок в массиве state.boards отображаем их список и завертываем в ссылки,
	// содержащие в сегменте пути ID доски для обработки роутером (в app.js)
	const boardsList = !boards.length
		? <p className="text-light">Здесь пока ничего нет...</p>
		: <ul className="list-group justify-content-center">
				{boards.map(({ id, name }) => {
					return (
						<Link to={`/board_${id}`} key={id} className="col-6 mb-3 rounded">
							<li className="col-12 btn btn-success bg-gradient btn-lg py-4">{name}</li>
						</Link>
					)
				})}
			</ul>;

	return (
		<>
			<h2 className="text-light">Мои доски:</h2>
			{boardsList}
		</>
	)
}

export default BoardsList;