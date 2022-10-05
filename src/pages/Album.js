import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends Component {
  state = {
    artista: '',
    album: '',
    musicas: [],
    loading: false,
    arrayFavoritas: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const faixas = await getMusics(id);
    const favoritadas = await getFavoriteSongs();
    const { artistName, collectionName } = faixas[0];
    this.setState({
      artista: artistName,
      album: collectionName,
      musicas: faixas.slice(1),
      arrayFavoritas: favoritadas.map((favoritada) => favoritada.trackId),
    });
  }

  handleFavoriteSong = async (song) => {
    const { arrayFavoritas } = this.state;
    this.setState({ loading: true });
    await addSong(song);
    if (arrayFavoritas.includes(song.trackId)) {
      this.setState({ loading: false });
    } else {
      this.setState({
        loading: false,
        arrayFavoritas: [...arrayFavoritas, song.trackId],
      });
    }
  };

  render() {
    const {
      artista,
      album,
      musicas,
      loading,
      arrayFavoritas,
    } = this.state;
    return (
      <div>
        <h1>PAGINA ALBUM</h1>
        <Header />
        { loading ? <Loading /> : (
          <div data-testid="page-album">
            <h2 data-testid="artist-name">{ artista }</h2>
            <h3 data-testid="album-name">{ album }</h3>
            { musicas.map(
              (musica) => (
                <MusicCard
                  key={ musica.trackId }
                  { ...musica }
                  onFavoriteChange={ () => this.handleFavoriteSong(musica) }
                  arrayFavoritas={ arrayFavoritas }
                />),
            )}
          </div>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.object,
}.isRequired;

export default Album;
