import {useState, useEffect} from 'react';
import nextId from 'react-id-generator';
import {Link} from 'react-router-dom';

import './comicsList.css';

import ComicsItem from '../comicsItem/comicsItem';
import ButtonTriangle from '../buttonTriangle/ButtonTriangle';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelServices';
import ComicBanner from '../comicsBanner/ComicBanner';

import Spinner from '../spinner/Spinner';

export default function ComicsList() {
	const limit = 8;

	const {loading, error, getAllComics, clearErrors} = useMarvelService();

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
		getAllComics(limit, offset).then((res) => updateComics(res));
		setOffset((offset) => offset + limit);
	};

	const setRenderItems = (item) => {
		return (
			<Link to={`/comics/${item.id}`} key={nextId()}>
				<ComicsItem thumbnail={item.thumbnail} title={item.title} price={item.price} />
			</Link>
		);
	};

	const render = comicsList.map((item) => setRenderItems(item));

	const content = {
		loading: (
			<div className='loadingWrapper'>
				<Spinner key={nextId} />
			</div>
		),
		error: (
			<div className='loadingWrapper error'>
				<ErrorMessage />
				<h3>Error, try again</h3>
			</div>
		),
	};

	const comicsListRender =
		(loading || error) && render.length === 0 ? null : (
			<div className='comicsItemsWrapper'>{render}</div>
		);
	const loadingRender = loading ? content.loading : null;
	const errorContent = error ? content.error : null;

	return (
		<>
			<ComicBanner />
			<div>
				{comicsListRender}
				{loadingRender}
				{errorContent}
				<div className='loadButWrapper' onClick={onRequest}>
					<ButtonTriangle value='Load more' background='Red' disabled={loading} />
				</div>
			</div>
		</>
	);
}
