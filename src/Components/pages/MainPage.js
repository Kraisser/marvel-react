import visionBg from '../../assets/visionBg.png';

import {useState} from 'react';

import CharacterPreInfo from '../characterPreInfo/CharacterPreInfo';
import CharactersList from '../charactersList/CharactersList';
import CharactertDescription from '../characterDescription/CharacterDescription';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

export default function MainPage() {
	const [charId, setCharId] = useState(null);

	const onCharSelect = (id) => {
		setCharId(id);
	};

	return (
		<>
			<ErrorBoundary>
				<CharacterPreInfo />
			</ErrorBoundary>
			<div className='flex-row mainContainer'>
				<ErrorBoundary>
					<CharactersList onCharSelect={onCharSelect} />
				</ErrorBoundary>
				<ErrorBoundary>
					<CharactertDescription charId={charId} />
				</ErrorBoundary>
			</div>
			<img src={visionBg} className='visionBg' alt='vision bg' />
		</>
	);
}
