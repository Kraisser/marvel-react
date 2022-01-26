import './app.css';

import {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Routes, Route, Link, NavLink} from 'react-router-dom';

import Spinner from '../spinner/Spinner';

const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleContentPage = lazy(() => import('../pages/SingleContentPage'));
const Page404 = lazy(() => import('../pages/404'));

export default function App() {
	return (
		<>
			<Router>
				<header className='header'>
					<div>
						<h2 className='mainHeader'>
							<Link to='/marvel-react'>
								<span className='marvelColor'>Marvel</span> information portal
							</Link>
						</h2>
						<nav className='navHeader'>
							<NavLink
								className={({isActive}) => (isActive ? `marvelColor` : '')}
								to='/marvel-react'>
								Characters
							</NavLink>
							<span> / </span>
							<NavLink className={({isActive}) => (isActive ? `marvelColor` : '')} to='/comics'>
								Comics
							</NavLink>
						</nav>
					</div>
				</header>
				<main className='main'>
					<Suspense fallback={<Spinner />}>
						<Routes>
							<Route path='/marvel-react' element={<MainPage />} />
							<Route path='/comics' element={<ComicsPage />} />
							<Route path='/comics/:id' element={<SingleContentPage type='comic' />} />
							<Route path='/character/:id' element={<SingleContentPage type='char' />} />
							<Route path='*' element={<Page404 />} />
						</Routes>
					</Suspense>
				</main>
			</Router>
		</>
	);
}
