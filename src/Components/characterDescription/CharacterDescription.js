import './characterDescription.css';

import { Component } from 'react';

import nextId from 'react-id-generator';

import MarvelService from '../../services/MarvelServices';
import ButtonTriangle from '../buttonTriangle/ButtonTriangle';
import Comics from '../comics/Comics';
import Skeleton from '../skeleton/Skeleton';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';


export default class CharactertDescription extends Component{

  state = {
    char: null,
    loading: false,
    error: false
  }

  marvelService = new MarvelService();

  componentDidMount () {
    this.updateChar();
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.charId !== prevProps.charId) {
      this.updateChar();
    }
  }

  updateChar = () => {
    const { charId } = this.props;

    if (!charId) {
      return
    }

    this.onCharLoading();

    this.marvelService.getCharacter(charId)
      .then(this.onCharLoaded)
      .catch(this.onError);
  }

  onCharLoaded = (res) => {
    this.setState({
      char: res,
      loading: false
    })
  }

  onCharLoading = () => {
    this.setState({loading: true})
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false
    })
  }
  
  render() {
    const { char, loading, error } = this.state;

    const skeleton = char || loading || error ? null : <Skeleton />,
      errorMessage = error ? <ErrorMessage/> : null,
      loadingProcess = loading ? <Spinner/> : null,
      content = error || loading || !char ? null : View(char);
    
    return (
      <div className="characterDescriptionMainWrapper">
        {skeleton}
        {errorMessage}
        {loadingProcess}
        {content}
      </div>
    )
  }
}

const View = (char) => {

  const { name, description, thumbnail, homepage, wiki, comics } = char;
  const comicsItems = comics.map((item, index) => {
    if (index > 9) {
      return null
    }
    return <Comics name={item.name} link={item.resourceURI} key={nextId()} />
  })
  const emptyComics = <div className='emptyComics'>No comics found</div>
  const comicsContent = comicsItems.length === 0 ? emptyComics : comicsItems;
  
  return (
    <>
      <div className="characterDescriptionWrapper">
        <div className="characterDescriptionContainer">
          <img src={thumbnail} alt={name} />
          <div>
            <h3 className="characterDescriptionHeader">{name}</h3>
            <div className="characterDescriptionButsContainer">
              <ButtonTriangle value="homepage" link={homepage} background="Red" />
              <ButtonTriangle value="wiki" link={wiki} background="Grey"/>
            </div>
          </div>
        </div>
        <div>
          <p>
            {description ? description : 'No description'}
          </p>
        </div>
      </div>
      <div className="comicsListWrapper">
        <h4 className="comicsHeader">Comics:</h4>
        <div className="comicsListContainer">
          {comicsContent}
        </div>
      </div>
    </>
  )
}