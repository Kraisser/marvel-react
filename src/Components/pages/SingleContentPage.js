import './SingleContentPage.css';

import {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import {Helmet, HelmetProvider} from 'react-helmet-async';

import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelServices';
import ComicBanner from '../comicsBanner/ComicBanner';

import Spinner from '../spinner/Spinner';

export default function SingleContentPage(props) {
	const {id} = useParams();
	const [content, setContent] = useState(null);
	const {loading, error, getComic, getCharacter, clearErrors} = useMarvelService();
	const contentType = props.type;

	useEffect(() => {
		switch (contentType) {
			case 'comic':
				updateComic();
				break;

			case 'char':
				updateChar();
				break;
			default:
				break;
		}
	}, [id]);

	const updateComic = () => {
		clearErrors();

		getComic(id).then(onLoadContent);
	};

	const updateChar = () => {
		clearErrors();

		getCharacter(id).then(onLoadContent);
	};

	const onLoadContent = (content) => {
		setContent(content);
	};

	const ViewComponent = contentType === 'char' ? ViewChar : ViewComic;
	const renderContent = !loading && !error && content ? ViewComponent(content) : null;
	const loadingContent = loading && !error ? <Spinner /> : null;
	const errorContent = error ? <ErrorMessage /> : null;

	return (
		<>
			<ComicBanner />
			{renderContent}
			{loadingContent}
			{errorContent}
		</>
	);
}

function ViewComic(comic) {
	const {thumbnail, title, price, description, pageCount, language} = comic;

	return (
		<>
			<HelmetProvider>
				<Helmet>
					<meta name='description' content={`Marvel comic ${title} info`} />
					<title>{title}</title>
				</Helmet>
			</HelmetProvider>

			<div className='singleContentWrapper'>
				<img src={thumbnail} alt={title} />
				<div className='singleContentContainer'>
					<div className='contentDescriptionWrapper'>
						<h2>{title}</h2>
						<div className='contentInfo'>{description}</div>
						<div className='contentInfo'>{pageCount}</div>
						<div className='contentInfo'>Language: {language}</div>
						<div className='comicPrice marvelColor'>{price}</div>
					</div>
					<div className='comicBackLink'>
						<Link to='/comics'>Back to All</Link>
					</div>
				</div>
			</div>
		</>
	);
}

function ViewChar(char) {
	const {thumbnail, name, description} = char;

	return (
		<>
			<HelmetProvider>
				<Helmet>
					<meta name='description' content={`Marvel character ${name} info`} />
					<title>Character {name} info</title>
				</Helmet>
			</HelmetProvider>

			<div className='singleContentWrapper'>
				<img src={thumbnail} alt={name} />
				<div className='contentDescriptionWrapper'>
					<h2>{name}</h2>
					<div className='contentInfo'>{description}</div>
				</div>
			</div>
		</>
	);
}
