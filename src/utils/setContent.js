import Skeleton from '../Components/skeleton/Skeleton';
import Spinner from '../Components/spinner/Spinner';
import ErrorMessage from '../Components/errorMessage/ErrorMessage';

export default function setContent(process, Component, data) {
	switch (process) {
		case 'waiting':
			return <Skeleton />;
		case 'loading':
			return <Spinner />;
		case 'success':
			return <Component data={data} />;
		case 'error':
			return <ErrorMessage />;
		default:
			throw new Error(`Unexpected process state`);
	}
}
