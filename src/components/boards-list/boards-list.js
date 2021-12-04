import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './boards-list.scss'

const BoardsList = ({ boards }) => {
	const boardsList = !boards.length
		? <p className="text-light">Здесь пока ничего нет...</p>
		: <ul className="list-group justify-content-center">
				{boards.map(({ id, name }) => {
					return (
						<Link to={`/board_${id}`} key={id} className="col-6 mb-3 rounded">
							<li className="col-12 btn btn-success btn-lg py-4">{name}</li>
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

const mapStateToProps = ({ boards }) => ({ boards });

export default connect(mapStateToProps)(BoardsList);