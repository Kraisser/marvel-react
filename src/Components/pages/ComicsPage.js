import ComicsList from '../comicsList/comicsList';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

export default function ComicsPage() {
	return (
		<ErrorBoundary>
			<ComicsList />
		</ErrorBoundary>
	);
}
