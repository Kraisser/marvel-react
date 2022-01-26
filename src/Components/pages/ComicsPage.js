import ComicsList from '../comicsList/comicsList';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import {Helmet, HelmetProvider} from 'react-helmet-async';

export default function ComicsPage() {
	return (
		<ErrorBoundary>
			<HelmetProvider>
				<Helmet>
					<meta name='description' content='Comics list' />
					<title>Marvel Comics list</title>
				</Helmet>
			</HelmetProvider>
			<ComicsList />
		</ErrorBoundary>
	);
}
