import logo from './logo.svg';
import { Link } from 'react-router-dom';
import './app-header.scss'

const AppHeader = () => {
	return (
		<header className="header">
			<Link to='/'>
				<img src={logo} className="logo" alt="minitrello-react" />
			</Link>
		</header>
	)
}

export default AppHeader;