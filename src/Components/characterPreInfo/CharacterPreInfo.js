import './characterPreInfo.css';

import {useState, useEffect} from 'react';

import shieldAndHammer from '../../assets/shield and hammer.png';

import ButtonTriangle from '../buttonTriangle/ButtonTriangle';

import useMarvelService from '../../services/MarvelServices';
import setContent from '../../utils/setContent';

export default function CharacterPreInfo() {
	const [char, setChar] = useState({});

	const {getCharacter, clearErrors, process, setProcess} = useMarvelService();

	useEffect(() => {
		updateChar();
	}, []);

	const onLoadChar = (char) => {
		setChar(char);
	};

	const updateChar = () => {
		clearErrors();
		const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

		getCharacter(id)
			.then(onLoadChar)
			.then(() => setProcess('success'));
	};

	return (
		<div className='charPreinfoWrapper'>
			<div className='preInfoWrapper'>{setContent(process, View, char)}</div>
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

const View = ({data}) => {
	const {name, description, thumbnail, homepage, wiki} = data;

	return (
		<>
			<img className='preInfoImg' src={thumbnail} alt={`${name}`} />
			<div className='preInfoContainer'>
				<h3>{name}</h3>
				<div className='preInfoDescriptionOverflow'>
					<p className='preInfoDescription'>{description}</p>
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
