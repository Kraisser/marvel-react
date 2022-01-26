import './comicsItem.css';

export default function ComicsItem(props) {
	const {thumbnail, title, price} = props;

	return (
		<div className='comicsItemWrapper'>
			<img src={thumbnail} alt={title} />
			<h4>{title}</h4>
			<span>{price}</span>
		</div>
	);
}
