import './charactersList.css';

import {useState, useEffect} from 'react';
import nextId from 'react-id-generator';

import useMarvelService from '../../services/MarvelServices';
import Character from '../character/Character';
import ButtonTriangle from '../buttonTriangle/ButtonTriangle';
import ErrorMessage from '../errorMessage/ErrorMessage';

import Spinner from '../spinner/Spinner';

export default function CharactersList(props) {
	const {loading, error, setMaxChars, getAllCharacters, clearErrors} = useMarvelService();

	const limit = 9;

	const [chars, setChars] = useState([]);
	const [offset, setOffset] = useState(0);
	const [charEnded, setCharEnded] = useState(false);
	const [maxCharsNum, setMaxCharsNum] = useState(limit + 1);
	const [focusCharId, setFocusCharId] = useState(null);

	useEffect(() => {
		if (chars.length === 0) {
			setMaxChars().then((maxChars) => setMaxCharsNum(maxChars));
			onRequest(offset);
		}
	}, []);

	function onFocusChar(id) {
		setFocusCharId(id);
		setChars(setCharList(chars));

		props.onCharSelect(id);
	}

	const setCharList = (res) =>
		res.map((item) => ({
			name: item.name,
			id: item.id,
			focus: item.id === props.focusCharId ? true : false,
			thumbnail: item.thumbnail,
			key: nextId(),
		}));

	const onRequest = (offset) => {
		clearErrors();
		getAllCharacters(limit, offset).then(onLoadChars);

		setOffset((offset) => offset + limit);
	};

	const onUpdateChar = () => onRequest(offset + limit);

	const onLoadChars = (res) => {
		const charEnd = offset + limit >= maxCharsNum ? true : false;

		const newChars = setCharList(res);

		setChars([...chars, ...newChars]);
		setCharEnded(charEnd);
	};

	const render = chars.map((item) => (
		<Character
			name={item.name}
			id={item.id}
			focus={item.id === focusCharId ? true : false}
			thumbnail={item.thumbnail}
			onFocusChar={onFocusChar}
			key={nextId()}
		/>
	));

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

	const charsWrapper =
		(loading || error) && chars.length === 0 ? null : (
			<div className='charactersListContainer'>{render}</div>
		);
	const loadingContent = loading ? content.loading : null;
	const errorContent = error ? content.error : null;

	return (
		<>
			<div className='charactersListWrapper'>
				{errorContent}
				{charsWrapper}
				{loadingContent}
				<div className='longButContainer'>
					<ButtonTriangle
						value='load more'
						click={onUpdateChar}
						disabled={loading}
						background='Red'
						classList={`longBut ${charEnded ? `hidden` : ''}`}
					/>
				</div>
			</div>
		</>
	);
}
