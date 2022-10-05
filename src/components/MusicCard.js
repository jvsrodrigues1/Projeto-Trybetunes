import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const {
      trackName,
      previewUrl,
      trackId,
      onFavoriteChange,
      arrayFavoritas,
    } = this.props;
    return (
      <div>
        <h2>{ trackName }</h2>
        <audio
          data-testid="audio-component"
          src={ previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label htmlFor="favorita">
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            name="favorita"
            id="favorita"
            onChange={ onFavoriteChange }
            checked={ arrayFavoritas.includes(trackId) }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  trackId: PropTypes.number,
  onFavoriteChange: PropTypes.func,
  arrayFavoritas: PropTypes.array,
}.isRequired;

export default MusicCard;
