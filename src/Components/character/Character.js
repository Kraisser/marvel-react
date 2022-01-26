import './character.css';

import PropTypes from 'prop-types';
import {CSSTransition} from 'react-transition-group';
import {useRef} from 'react';

export default function Character(props) {
	const {thumbnail, name, id, focus, onFocusChar} = props;
	const nodeRef = useRef(null);

	const focused = focus ? 'charSelected' : '';

	return (
		<CSSTransition
			timeout={300}
			in={!!id}
			nodeRef={nodeRef}
			classNames='charWrapper-anim'
			appear={true}>
			<div
				ref={nodeRef}
				className={`charWrapper ${focused}`}
				tabIndex='0'
				onClick={() => onFocusChar(id)}>
				<img src={thumbnail} alt={name} />
				<h3 className='characterHeader'>{name}</h3>
			</div>
		</CSSTransition>
	);
}

Character.propTypes = {
	id: PropTypes.number,
	onCharSelect: PropTypes.func,
};
