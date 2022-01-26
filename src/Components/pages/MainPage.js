import visionBg from '../../assets/visionBg.png';

import {useState} from 'react';
import {Helmet, HelmetProvider} from 'react-helmet-async';

import CharacterPreInfo from '../characterPreInfo/CharacterPreInfo';
import CharactersList from '../charactersList/CharactersList';
import CharactertDescription from '../characterDescription/CharacterDescription';
import SearchChar from '../searchChar/searchChar';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

export default function MainPage() {
	const [charId, setCharId] = useState(null);

	const onCharSelect = (id) => {
		setCharId(id);
	};

	return (
		<>
			<HelmetProvider>
				<Helmet>
					<meta name='description' content='Marvel Database' />
					<title>Marvel Database</title>
				</Helmet>
			</HelmetProvider>

			<ErrorBoundary>
				<CharacterPreInfo />
			</ErrorBoundary>
			<div className='flex-row mainContainer'>
				<ErrorBoundary>
					<CharactersList onCharSelect={onCharSelect} />
				</ErrorBoundary>

				<div className='rightMainContent'>
					<ErrorBoundary>
						<CharactertDescription charId={charId} />
					</ErrorBoundary>
					<ErrorBoundary>
						<SearchChar />
					</ErrorBoundary>
				</div>
			</div>
			<img src={visionBg} className='visionBg' alt='vision bg' />
		</>
	);
}
