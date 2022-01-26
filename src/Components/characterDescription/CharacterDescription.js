import './characterDescription.css';

import {useState, useEffect} from 'react';

import nextId from 'react-id-generator';

import useMarvelService from '../../services/MarvelServices';
import ButtonTriangle from '../buttonTriangle/ButtonTriangle';
import Comics from '../comics/Comics';
import Skeleton from '../skeleton/Skeleton';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

export default function CharactertDescription(props) {
	const [char, setChar] = useState(null);

	const {loading, error, getCharacter} = useMarvelService();

	useEffect(() => {
		if (props.charId) {
			getCharacter(props.charId).then((res) => setChar(res));
		}
	}, [props.charId]);

	const skeleton = char || loading || error ? null : <Skeleton />,
		errorMessage = error ? <ErrorMessage /> : null,
		loadingProcess = loading ? <Spinner /> : null,
		content = error || loading || !char ? null : View(char);

	return (
		<div className='characterDescriptionMainWrapper'>
			{skeleton}
			{errorMessage}
			{loadingProcess}
			{content}
		</div>
	);
}

const View = (char) => {
	const {name, description, thumbnail, homepage, wiki, comics} = char;
	const comicsItems = comics.map((item, index) => {
		if (index > 9) {
			return null;
		}
		return <Comics name={item.name} link={item.resourceURI} key={nextId()} />;
	});
	const emptyComics = <div className='emptyComics'>No comics found</div>;
	const comicsContent = comicsItems.length === 0 ? emptyComics : comicsItems;

	return (
		<>
			<div className='characterDescriptionWrapper'>
				<div className='characterDescriptionContainer'>
					<img src={thumbnail} alt={name} />
					<div>
						<h3 className='characterDescriptionHeader'>{name}</h3>
						<div className='characterDescriptionButsContainer'>
							<ButtonTriangle value='homepage' link={homepage} background='Red' />
							<ButtonTriangle value='wiki' link={wiki} background='Grey' />
						</div>
					</div>
				</div>
				<div>
					<p>{description}</p>
				</div>
			</div>
			<div className='comicsListWrapper'>
				<h4 className='comicsHeader'>Comics:</h4>
				<div className='comicsListContainer'>{comicsContent}</div>
			</div>
		</>
	);
};
