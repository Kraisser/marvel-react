import './skeleton.css';

export default function Skeleton(props) {
  return (
    <div className="skeletonWrapper">
      <h3 className="skeletonHeader">Please select a character to see information</h3>
      <div className="skeletonContainer">
        <div className="skeletonChar">
          <div className="skeletonRound"></div>
          <div className="skeletonEmptyHeader"></div>
        </div>
        <div className="skeletonComics"></div>
        <div className="skeletonComics"></div>
        <div className="skeletonComics"></div>
      </div>
    </div>
  )
}