import './app.css';

import {BrowserRouter as Router, Switch, Route, Link, NavLink} from 'react-router-dom';

import {MainPage, ComicsPage} from '../pages';

export default function App() {
	return (
		<>
			<Router>
				<header className='header'>
					<div>
						<h2 className='mainHeader'>
							<Link to='/' className='navLinks'>
								<span className='marvelColor'>Marvel</span> information portal
							</Link>
						</h2>
						<nav className='navHeader'>
							<NavLink exact activeClassName='marvelColor' to='/'>
								Characters
							</NavLink>{' '}
							/{' '}
							<NavLink exact activeClassName='marvelColor' to='/comics'>
								Comics
							</NavLink>
						</nav>
					</div>
				</header>
				<main className='main'>
					<Switch>
						<Route exact path='/'>
							<MainPage />
						</Route>

						<Route exact path='/comics'>
							<ComicsPage />
						</Route>
					</Switch>
				</main>
			</Router>
		</>
	);
}
