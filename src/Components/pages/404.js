import './404.css';

import ErrorMessage from '../errorMessage/ErrorMessage';
import {Link} from 'react-router-dom';
import {Helmet, HelmetProvider} from 'react-helmet-async';

export default function Page404() {
	return (
		<div className='page404'>
			<HelmetProvider>
				<Helmet>
					<meta name='description' content='Page not found 404' />
					<title>Marvel 404</title>
				</Helmet>
			</HelmetProvider>
			<ErrorMessage />
			<h2 className='header404'>Страница не найдена</h2>
			<Link to='/marvel-react' className='backLink404'>
				Вернуться обратно
			</Link>
		</div>
	);
}
