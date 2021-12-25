import './character.css';

import React, { Component } from 'react';
import nextId from 'react-id-generator';
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';


export default class Character extends Component{

  charSelectRef = React.createRef();
    
  render() {
    const { thumbnail, name, id, onCharSelect, error } = this.props;

    const content = {
      char:
        <div className="charWrapper"
          ref={this.charSelectRef}
          tabIndex="0"
          onClick={() => {
            onCharSelect(id);
            this.props.setSelectChar(this.charSelectRef);
          }}>
          <img src={thumbnail} alt="test" />
          <h3 className="characterHeader">{name}</h3>
        </div>,
      loading:
        <div className="charWrapper loadingChar">
          <Spinner key={nextId}/>
        </div>,
      error:
        <div className="charWrapper">
          <ErrorMessage />
          <h3 className="characterHeader">Error, try again</h3>
        </div>
    }

    const char = (thumbnail && name) ? content.char : null,
      errorMessage = error ? content.error : null,
      loading = ((thumbnail && name) || error) ? null : content.loading;

    return ( 
      <>
        {char}
        {errorMessage}
        {loading}
      </>
    )
  }
}

Character.propTypes = {
  id: PropTypes.number,
  onCharSelect: PropTypes.func
}