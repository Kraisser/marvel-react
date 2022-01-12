import './characterPreInfo.css';

import {useState, useEffect} from 'react';
import nextId from 'react-id-generator';

import shieldAndHammer from '../../assets/shield and hammer.png';

import ButtonTriangle from '../buttonTriangle/ButtonTriangle';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelServices';

export default function CharacterPreInfo() {
	const [char, setChar] = useState({});

	const {loading, error, getCharacter, clearErrors} = useMarvelService();

	const troubleContent = {
		error: (
			<>
				<ErrorMessage />
				<h2>404</h2>
			</>
		),
		loading: (
			<>
				<Spinner key={nextId()} />
				<Spinner key={nextId()} />
			</>
		),
	};

	useEffect(() => {
		updateChar();
	}, []);

	const onLoadChar = (char) => {
		setChar(char);
	};

	const updateChar = () => {
		clearErrors();
		const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

		getCharacter(id).then(onLoadChar);
	};

	const errorMessage = error ? troubleContent.error : null,
		loadingProcess = loading ? troubleContent.loading : null,
		content = error || loading ? null : View(char);

	return (
		<div className='charPreinfoWrapper'>
			<div className='preInfoWrapper'>
				{errorMessage}
				{loadingProcess}
				{content}
			</div>
			<div className='randomCharacterWrapper'>
				<img src={shieldAndHammer} alt='shield and hammer' />
				<div className='randomCharacterContainer'>
					<p>Random character for today! Do you want to get to know him better?</p>
					<p>Or choose another one</p>
					<ButtonTriangle click={updateChar} value='try it' background='Red' />
				</div>
			</div>
		</div>
	);
}

const View = (char) => {
	const {name, description, thumbnail, homepage, wiki} = char;

	return (
		<>
			<img className='preInfoImg' src={thumbnail} alt={`${name}`} />
			<div className='preInfoContainer'>
				<h3>{name}</h3>
				<div className='preInfoDescriptionOverflow'>
					<p className='preInfoDescription'>{description ? description : 'No description'}</p>
				</div>
				<div className='preInfoLinkContainer'>
					<ButtonTriangle
						value='homepage'
						link={homepage}
						classList='preInfoBut'
						background='Red'
					/>
					<ButtonTriangle value='wiki' link={wiki} background='Grey' />
				</div>
			</div>
		</>
	);
};
