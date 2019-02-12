import React, { Component } from 'react'

// Assets
import store from '../../js/store'
import { logout } from '../../js/actions'

// Coponents
import { Link } from 'react-router-dom'
/* import components here */

export default class Header extends Component {

  constructor(props) {
    super(props)
    this.state = {
      authed: store.getState().session
    }
  }

  componentDidMount() {
    store.subscribe(() => {
      this.setState({ authed: store.getState().session })
    })
  }

  handleClick(event) {
    event.preventDefault()
    localStorage.removeItem('token')
    store.dispatch(logout())
  }

  render() {

    const { authed } = this.state

    return (
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-black">
        <Link className="navbar-brand font-logo" to="/">Cucinapp</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            { authed ? (
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link link-color-h" to="/home">Inicio</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link link-color-h" to="/profile">Mi perfil</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link link-color-h" to="#"
                      onClick={ (e) => this.handleClick(e) }>Cerrar Sesión</Link>
                  </li>
                </ul>
              ) : (
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link link-color-h" to="/signin">Inicia Sesión</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link link-color-h" to="/signup">Regístrate</Link>
                  </li>
                </ul>
              )}
        </div>
      </nav>

    )
  }
}
