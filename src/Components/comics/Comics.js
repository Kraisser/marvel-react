import './comics.css';

import {Link} from 'react-router-dom';

export default function Comics(props) {
	const {name, link} = props;
	const id = link.match(/[0-9]{1,}$/gm)[0];

	return (
		<div className='comicsWrapper'>
			<Link to={`/comics/${id}`}>{name}</Link>
		</div>
	);
}
