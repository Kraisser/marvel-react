import './app.css';

import visionBg from '../../assets/visionBg.png';

import { Component } from 'react';

import CharacterPreInfo from '../characterPreInfo/CharacterPreInfo';
import CharactersList from '../charactersList/CharactersList';
import CharactertDescription from '../characterDescription/CharacterDescription';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

export default class App extends Component {

  state = {
    charId: null
  }

  onCharSelect = (id) => {
    this.setState({ charId: id });
  }

  render() {
    return (
      <>
        <header className="header">
          <div>
            <h2 className='mainHeader'><span className="marvelColor">Marvel</span> information portal</h2>
            <nav className='navHeader'><span className="marvelColor">Characters</span> / Comics</nav>
          </div>
        </header>
        <main className="main">
          <ErrorBoundary>
            <CharacterPreInfo />
          </ErrorBoundary>
          <div className='flex-row mainContainer'>
            <ErrorBoundary>
              <CharactersList onCharSelect={this.onCharSelect}/>        
            </ErrorBoundary>
            <ErrorBoundary>
              <CharactertDescription charId={this.state.charId}/>
            </ErrorBoundary>
          </div>
          <img src={visionBg} className='visionBg' alt="vision bg" />
        </main>
      </>
    );
  }
}