import './buttonTriangle.css';

export default function ButtonTriangle(props) {
	const {value, type, background, link, click, disabled} = props;
	const classList = props.classList ? props.classList : '';

	const innerContent = <div className={`marvel${background}Back`}>{value}</div>;

	const content = {
		button: (
			<button
				onClick={click}
				type={type ? type : null}
				className={`commonBut back${background} ${classList}`}>
				{innerContent}
			</button>
		),
		butDisabled: (
			<button onClick={click} className={`commonBut back${background} ${classList}`} disabled>
				{innerContent}
			</button>
		),
		link: (
			<a
				href={link}
				target='_blank'
				rel='noreferrer'
				className={`commonBut back${background} ${classList}`}>
				{innerContent}
			</a>
		),
	};

	const linkRender = link ? content.link : null;
	const butDisRender = disabled ? content.butDisabled : null;
	const butRender = !disabled && !link ? content.button : null;

	return (
		<>
			{linkRender}
			{butRender}
			{butDisRender}
		</>
	);
}
