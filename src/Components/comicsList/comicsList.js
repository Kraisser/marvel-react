import {useState, useEffect} from 'react';
import nextId from 'react-id-generator';

import './comicsList.css';

import ComicsItem from '../comicsItem/comicsItem';
import ButtonTriangle from '../buttonTriangle/ButtonTriangle';
import useMarvelService from '../../services/MarvelServices';

import avengers from '../../assets/Avengers.png';
import avengersLogo from '../../assets/Avengers logo.png';

export default function ComicsList() {
	const {loading, getAllComics} = useMarvelService();

	const [comicsList, setComicsList] = useState(null);

	useEffect(() => {
		getAllComics().then((res) => setComicsList(res));
	}, []);

	const comicsListRender = comicsList
		? comicsList.map((item) => {
				return (
					<ComicsItem
						thumbnail={`${item.thumbnail.path}.${item.thumbnail.extension}`}
						title={item.title}
						price={item.prices[0].price}
						key={nextId()}
					/>
				);
		  })
		: null;

	return (
		<>
			<div className='bannerWrapper'>
				<img src={avengers} alt='avengers' />
				<div className='bannerHeadersWrapper'>
					<h3 className='bannerHeader'>New comics Every week!</h3>
					<h3 className='bannerHeader'>Stay tuned!</h3>
				</div>
				<img src={avengersLogo} alt='avengersLogo' />
			</div>
			<div>
				<div className='comicsListWrapper'>
					{/* <ComicsItem />
					<ComicsItem />
					<ComicsItem />
					<ComicsItem />
					<ComicsItem />
					<ComicsItem />
					<ComicsItem />
					<ComicsItem /> */}
					{comicsListRender}
				</div>
				<div className='loadButWrapper' onClick={() => console.log(getAllComics())}>
					<ButtonTriangle value='Load more' background='Red' />
				</div>
			</div>
		</>
	);
}
