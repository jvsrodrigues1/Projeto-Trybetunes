import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    loading: true,
    displayName: '',
  };

  async componentDidMount() {
    const usuario = await getUser();
    this.setState({ displayName: usuario.name, loading: false });
  }

  render() {
    const { displayName, loading } = this.state;
    return (
      <header data-testid="header-component">

        { loading
          ? <Loading />
          : <h2 data-testid="header-user-name">{ displayName }</h2>}

        <section>
          <div className="a">
            <NavLink data-testid="link-to-search" to="/search">Pesquisa</NavLink>
          </div>
          <div className="b">
            <NavLink to="/album/:id">Album</NavLink>
          </div>
          <div className="c">
            <NavLink data-testid="link-to-favorites" to="/favorites">Favoritas</NavLink>
          </div>
          <div className="d">
            <NavLink data-testid="link-to-profile" to="/profile">Perfil</NavLink>
          </div>
          <div className="e">
            <NavLink to="/profile/edit">Edite o Perfil</NavLink>
          </div>
        </section>
      </header>
    );
  }
}

export default Header;
