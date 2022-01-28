import './comicsList.css';
import '../../utils/setContent.css';

import {useState, useEffect} from 'react';
import nextId from 'react-id-generator';
import {Link} from 'react-router-dom';

import ComicsItem from '../comicsItem/comicsItem';
import ButtonTriangle from '../buttonTriangle/ButtonTriangle';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelServices';
import ComicBanner from '../comicsBanner/ComicBanner';

import Spinner from '../spinner/Spinner';

function setContent(process, Component, data) {
	console.log('process', process);
	switch (process) {
		case 'waiting':
			return (
				<div className='loadingWrapper'>
					<Spinner />
				</div>
			);
		case 'loading':
			return data.length > 0 ? (
				<div className='comicsItemsWrapper'>
					<Component />
				</div>
			) : (
				<div className='loadingWrapper'>
					<Spinner />
				</div>
			);
		case 'success':
			return (
				<div className='comicsItemsWrapper'>
					<Component />
				</div>
			);
		case 'error':
			return (
				<div className='loadingWrapper error'>
					<ErrorMessage />
					<h3>Error, try again</h3>
				</div>
			);
		default:
			throw new Error(`Unexpected process state`);
	}
}

export default function ComicsList() {
	const limit = 8;

	const {loading, getAllComics, clearErrors, process, setProcess} = useMarvelService();

	const [comicsList, setComicsList] = useState([]);
	const [offset, setOffset] = useState(0);

	useEffect(() => {
		onRequest();
	}, []);

	const updateComics = (res) => {
		setComicsList([...comicsList, ...res]);
	};

	const onRequest = () => {
		clearErrors();
		getAllComics(limit, offset)
			.then((res) => updateComics(res))
			.then(() => setProcess('success'));
		setOffset((offset) => offset + limit);
	};

	const setRenderItems = (comicsList) => {
		const renderItems = comicsList.map((item) => (
			<Link to={`/comics/${item.id}`} key={nextId()}>
				<ComicsItem thumbnail={item.thumbnail} title={item.title} price={item.price} />
			</Link>
		));
		return renderItems;
	};

	return (
		<>
			<ComicBanner />
			<div>
				{setContent(process, () => setRenderItems(comicsList), comicsList)}
				<div className='loadButWrapper' onClick={onRequest}>
					<ButtonTriangle value='Load more' background='Red' disabled={loading} />
				</div>
			</div>
		</>
	);
}
