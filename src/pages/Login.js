import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      userData: {
        name: '',
      },
      loading: false,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      userData: {
        [name]: value,
      },
    });
  };

  isNameValid = (name) => {
    const minNameLength = 3;
    return (name.length >= minNameLength);
  };

  handleSubmitButton = (event) => {
    event.preventDefault();
    const { userData } = this.state;
    const { history } = this.props;
    this.setState({
      loading: true,
    }, async () => {
      await createUser(userData);
      history.push('/search');
    });
  };

  render() {
    const { userData, loading } = this.state;
    if (loading) return <Loading />;
    return (
      <div data-testid="page-login" className="login-page">
        <form className="login-form">
          <input
            type="text"
            name="name"
            data-testid="login-name-input"
            placeholder="Nome do Usuário"
            value={ userData.name }
            onChange={ this.handleChange }
          />
          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ !this.isNameValid(userData.name) }
            onClick={ this.handleSubmitButton }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
