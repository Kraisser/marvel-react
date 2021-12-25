import './characterPreInfo.css';

import { Component } from 'react';
import nextId from 'react-id-generator';

import shieldAndHammer from '../../assets/shield and hammer.png';

import ButtonTriangle from '../buttonTriangle/ButtonTriangle';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelServices';

export default class CharacterPreInfo extends Component{
  
  state = {
    char: {},
    loading: true,
    error: false
  }

  marvelService = new MarvelService();
  
  troubleContent = {
    error: <>
      <ErrorMessage />
      <h2>404</h2>
    </>,
    loading: <>
      <Spinner key={nextId()} />
      <Spinner key={nextId()} />
    </>
  }

  componentDidMount = () => {    
    this.updateChar();
  }

  onLoadChar = (char) => {
    this.setState({char, loading: false, error: false});
  }

  onLoadingChar = () => {
    this.setState({ loading: true });
  }

  onLoadError = () => {
    this.setState({error: true, loading: false});
  }

  updateChar = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

    this.onLoadingChar();

    this.marvelService.getCharacter(id)
      .then(this.onLoadChar)
      .catch(this.onLoadError)
  }

  render() {
    const { char, loading, error } = this.state;
    
    const errorMessage = error ? this.troubleContent.error : null,
      loadingProcess = loading ? this.troubleContent.loading : null,
      content = error || loading ? null : View(char);
    
    return (      
      <div className='charPreinfoWrapper'>
        <div className="preInfoWrapper">
          {errorMessage}
          {loadingProcess}
          {content}
        </div>
        <div className="randomCharacterWrapper">
          <img src={shieldAndHammer} alt="shield and hammer"/>
          <div className="randomCharacterContainer">
            <p>
              Random character for today!
              Do you want to get to know him better?
            </p>
            <p>Or choose another one</p>
            <ButtonTriangle click={this.updateChar} value="try it" background="Red"/>
          </div>
        </div>
      </div>
    )
  }
}

const View = (char) => {
  const { name, description, thumbnail, homepage, wiki } = char;

  return (
    <>
      <img className='preInfoImg' src={thumbnail} alt={`${name}`} />
        <div className="preInfoContainer">
          <h3>{name}</h3>
          <div className='preInfoDescriptionOverflow'>
            <p className='preInfoDescription'>
              {description ? description : 'No description'}
            </p>
          </div>
          <div className='preInfoLinkContainer'>
            <ButtonTriangle value="homepage"
              link={homepage}
              classList="preInfoBut"
              background="Red" />
            <ButtonTriangle value="wiki"
              link={wiki}
              background="Grey" />
          </div>        
        </div>
    </>
  )
}