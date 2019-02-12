import React, { Component } from 'react'

// Assets
import store from '../../js/store'
import { req } from '../../js/request'
import { login } from '../../js/actions'

// Components
import Error from '../utilities/Error'
import Loading from '../utilities/Loading'

export default class SignIn extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoaded: null,
      valid: true
    }
  }

  componentDidMount() {
    document.title = 'Inicia Sesión'
    this.setState({ isLoaded: true })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.setState({ isLoaded: null })
    const body = {
      query: 'query signin($input: Authenticate!){ login(input: $input) }',
      variables: {
        input: {
          email: document.getElementById('email').value,
          password: document.getElementById('password').value
        }
      }
    }

    req(body).then(
      res => {
        let token = res.data.data.login
        if (token) {
          localStorage.setItem('token', token)
          store.dispatch(login())
        } else {
          this.setState({
            isLoaded: true,
            valid: false
          })
        }
      }
    ).catch(
      err => {
        this.setState({ isLoaded: false })
      }
    )
  }

  render() {
    const { isLoaded, valid } = this.state

    if (isLoaded) {
      return (
        <div className="acc_form mx-auto">
          <h3 className="text-center gv-font">Inicia sesión en Cucinapp</h3>
        <form className="acc_form mx-auto" onSubmit={ (e) => this.handleSubmit(e) }>
            <div className="form-group">
              {/* <label htmlFor="email">Correo electronico</label> */}
              <input type="email" className="form-control" id="email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
                title="Debe contener el simbolo '@' seguido de un dominio"
                placeholder="Correo electronico"/>
            </div>
            <div className="form-group">
              {/* <label for="password">Contraseña</label> */}
              <input type="password" className="form-control" id="password"
                placeholder="Contraseña" pattern="(?=.*\d)(?=.*[a-zA-Z]).{8,}"
                title="Debe contener al menos un numero, una letra y al menos 8
                o mas caracteres"/>
                { valid ? null :
                  (<small className="form-text text-teal">
                    El correo o la contraseña son incorrectos
                  </small>)
                }
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">Inicia sesión</button>
            </div>
          </form>
        </div>
      )
    } else if (isLoaded == null) {
      return <Loading />
    } else {
      return <Error />
    }
  }
}
