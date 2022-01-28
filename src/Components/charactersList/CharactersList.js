import './charactersList.css';
import '../../utils/setContent.css';

import {useState, useEffect, useRef} from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import useMarvelService from '../../services/MarvelServices';
import ButtonTriangle from '../buttonTriangle/ButtonTriangle';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

function setContent(process, Component, data) {
	switch (process) {
		case 'waiting':
			return (
				<div className='loadingWrapper'>
					<Spinner />
				</div>
			);
		case 'loading':
			return data.length > 0 ? (
				<Component />
			) : (
				<div className='loadingWrapper'>
					<Spinner />
				</div>
			);
		case 'success':
			return <Component data={data} />;
		case 'error':
			return <ErrorMessage />;
		default:
			throw new Error(`Unexpected process state`);
	}
}

export default function CharactersList(props) {
	const {loading, setMaxChars, getAllCharacters, clearErrors, process, setProcess} =
		useMarvelService();

	const limit = 9;

	const [chars, setChars] = useState([]);
	const [offset, setOffset] = useState(0);
	const [charEnded, setCharEnded] = useState(false);
	const [maxCharsNum, setMaxCharsNum] = useState(limit + 1);

	useEffect(() => {
		if (chars.length === 0) {
			setMaxChars()
				.then((maxChars) => setMaxCharsNum(maxChars))
				.then(() => onRequest(offset));
		}
	}, []);

	const onRequest = (offset) => {
		clearErrors();
		getAllCharacters(limit, offset)
			.then(onLoadChars)
			.then(() => setProcess('success'));

		setOffset((offset) => offset + limit);
	};

	const onUpdateChar = () => onRequest(offset + limit);

	const onLoadChars = (newChars) => {
		const charEnd = offset + limit >= maxCharsNum ? true : false;

		setChars([...chars, ...newChars]);
		setCharEnded(charEnd);
	};

	const charsRef = useRef([]);

	const onFocusChar = (i) => {
		charsRef.current.forEach((item) => item.classList.remove(`charSelected`));
		charsRef.current[i].classList.add(`charSelected`);
		charsRef.current[i].focus();
	};

	const render = (chars) => {
		const items = chars.map((item, i) => {
			// const nodeRef = useRef();
			return (
				<CSSTransition
					key={item.id}
					timeout={300}
					classNames='charWrapper-anim'
					// in={!!item.id}
					// nodeRef={charsRef.current[i]}
					// appear={true}
				>
					<div
						className='charWrapper'
						tabIndex={0}
						ref={(el) => (charsRef.current[i] = el)}
						onClick={() => {
							props.onCharSelect(item.id);
							onFocusChar(i);
						}}>
						<img src={item.thumbnail} alt={item.name} />
						<h3 className='characterHeader'>{item.name}</h3>
					</div>
				</CSSTransition>
			);
		});

		return (
			<div className='charactersListContainer'>
				<TransitionGroup component={null}>{items}</TransitionGroup>
			</div>
		);
	};

	return (
		<div className='charactersListWrapper'>
			{setContent(process, () => render(chars), chars)}

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
	);
}
