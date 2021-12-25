import './charactersList.css';

import { Component } from 'react';
import nextId from 'react-id-generator';


import MarvelService from '../../services/MarvelServices';
import Character from '../character/Character';
import ButtonTriangle from '../buttonTriangle/ButtonTriangle';

export default class CharactersList extends Component {

  state = {
    chars: [],
    loading: null,
    offset: 0,
    newItemsLoading: false,
    charEnded: false,
    maxChars: null,
    selectedChar: null
  }

  limit = 9;

  marvelService = new MarvelService();

  componentDidMount = () => {
    this.loadingChars();

    this.setMaxChars();

    this.onRequest(this.state.offset);
  }

  setMaxChars = () => {
    this.marvelService.setMaxChars()
      .then(maxChars => this.setState({ maxChars }))
      .catch(e => console.log(e))
  }

  onRequest = (offset) => {
    this.marvelService.getAllCharacters(this.limit, offset)
      .then(this.onLoadChars)
      .catch(this.loadingChars);
  }

  onUpdateChar = () => {
    this.loadingChars();

    this.onRequest(this.state.offset + this.limit);    

    this.setState({
      offset: this.state.offset + this.limit,
      newItemsLoading: true
    });
  }

  onLoadChars = (res) => {
    const charEnded = this.state.offset + this.limit >= this.state.maxChars ? true : false;

    const chars = res.map(item => (<Character
      name={item.name}
      id={item.id}
      thumbnail={item.thumbnail}
      setSelectChar={this.setSelectChar}
      onCharSelect={this.props.onCharSelect}
      key={nextId()} />));
    
    this.setState({
      chars: [...this.state.chars, ...chars],
      loading: null,
      newItemsLoading: false,
      charEnded: charEnded
    });
  }

  loadingChars = (error) => {
    const loading = [];

    for (let i = 0; i < this.limit; i++) {
      loading.push(<Character error={error ? error : null} key={nextId()}/>);
    }

    this.setState({ loading, newItemsLoading: true });
  }

  setSelectChar = (selectedChar) => {
    selectedChar.current.classList.add('charSelected');

    if (this.state.selectedChar) {
      this.state.selectedChar.current.classList.remove('charSelected');
    }
    
    this.setState({ selectedChar });
  }
  
  render() {
    const { loading, chars, newItemsLoading, charEnded } = this.state;

    return (
      <>
        <div className="charactersListWrapper">
          <div className="charactersListContainer">
            {chars}
            {loading}
          </div>
          <div className="longButContainer">
            <ButtonTriangle value="load more"
              click={this.onUpdateChar}
              disabled={newItemsLoading}
              background="Red"
              classList={`longBut ${charEnded ? `hidden` : ''}`} />
          </div>
        </div>
      </>
    )
  }  
}