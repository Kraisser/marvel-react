import './character.css';

import PropTypes from 'prop-types';

export default function Character(props) {
	const {thumbnail, name, id, focus, onFocusChar} = props;

	const focused = focus ? 'charSelected' : '';

	return (
		<div className={`charWrapper ${focused}`} tabIndex='0' onClick={() => onFocusChar(id)}>
			<img src={thumbnail} alt='test' />
			<h3 className='characterHeader'>{name}</h3>
		</div>
	);
}

Character.propTypes = {
	id: PropTypes.number,
	onCharSelect: PropTypes.func,
};
