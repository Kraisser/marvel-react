import './comicBanner.css';

import avengers from '../../assets/Avengers.png';
import avengersLogo from '../../assets/Avengers logo.png';

export default function ComicBanner() {
	return (
		<div className='bannerWrapper'>
			<img src={avengers} alt='avengers' />
			<div className='bannerHeadersWrapper'>
				<h3 className='bannerHeader'>New comics Every week!</h3>
				<h3 className='bannerHeader'>Stay tuned!</h3>
			</div>
			<img src={avengersLogo} alt='avengersLogo' />
		</div>
	);
}
