import './comics.css';

export default function Comics(props) {
  const { name, link } = props;

  return (
    <div className="comicsWrapper">
      <a href={link} target="_blank" rel="noreferrer">{name}</a>
    </div>
  )
}