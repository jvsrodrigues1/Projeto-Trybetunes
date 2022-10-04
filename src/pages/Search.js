import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import Card from '../components/Card';

class Search extends Component {
  state = {
    pesquisa: '',
    searchButtonDisabled: true,
    loading: false,
    searchFound: false,
    arrayAlbuns: [],
    artista: '',
  };

  handleInputChange = ({ target }) => {
    this.setState({ pesquisa: target.value }, this.handleCaractersButton);
  };

  handleCaractersButton = () => {
    const minLength = 2;
    const { pesquisa } = this.state;
    if (pesquisa.length >= minLength) {
      this.setState({ searchButtonDisabled: false });
    } else {
      this.setState({ searchButtonDisabled: true });
    }
  };

  // handleClickSearchButton = async () => {
  //   this.setState({ loading: true, searchFound: false });
  //   const { pesquisa } = this.state;
  //   this.setState({ pesquisa: '' });

  //   const response = await searchAlbumsAPI(pesquisa);

    this.setState({
      loading: false,
      searchFound: true,
      arrayAlbuns: response,
      artista: pesquisa,
    });
  };

  render() {
    const {
      searchButtonDisabled,
      pesquisa,
      loading,
      searchFound,
      arrayAlbuns,
      artista,
    } = this.state;
    return (
      <>
        <h1>PAGINA SEARCH</h1>
        <Header />
        <div data-testid="page-search">
          <div>
            { loading ? <Loading /> : (
              <form>
                <input
                  data-testid="search-artist-input"
                  type="text"
                  value={ pesquisa }
                  onChange={ this.handleInputChange }
                  placeholder="Banda ou Artista"
                />
                <button
                  data-testid="search-artist-button"
                  disabled={ searchButtonDisabled }
                  type="button"
                  onClick={ this.handleClickSearchButton }
                >
                  Pesquisar
                </button>
              </form>)}
          </div>
          <div>
            { searchFound && (
              arrayAlbuns.length ? <p>{ `Resultado de álbuns de: ${artista}` }</p> : (
                <p>Nenhum álbum foi encontrado</p>
              )
            )}
          </div>
          <div>
            { arrayAlbuns.map((album) => (
              <Card key={ album.collectionID } { ...album } />))}
          </div>
        </div>
      </>
    );
  }
}

export default Search;
