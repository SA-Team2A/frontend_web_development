import React, { Component } from 'react'

// Assets
import { auth_req } from '../../js/request'

// Components
import Error from '../utilities/Error'
import Loading from '../utilities/Loading'

export default class UpdateProfile extends Component {

  constructor(props) {
    super(props)
    this.state = {
      user: null,
      isLoaded: null
    }
  }

  componentDidMount() {
    document.title = "Actualizar Perfil"
    const body = {
      query: `{
        user:getMyUser { id username email }
      }`
    }

    auth_req(body).then(
      res => {
        this.setState({
          user: res.data.data.user,
          isLoaded: true
        })
      }
    ).catch(
      err => {
        this.setState({ isLoaded: false })
        console.log(err.response)
      }
    )
  }

  handleSubmit(event) {
    event.preventDefault()
    this.setState({ isLoaded: null })
    const body = {
      query: `
        mutation update($id: ID!, $input: UserInput!){
          updateUser(id: $id, user: $input){
            id
            username
            email
          }
        }
      `,
      variables: {
        input: {
          username: document.getElementById('username').value,
          email: document.getElementById('email').value
        },
        id: this.state.user.id
      }
    }
    auth_req(body).then(
      res => {
        console.log(res.data.data)
      }
    ).catch(
      err => {
        console.log(err.response)
      }
    )
  }

  render() {
    const { isLoaded, user } = this.state

    if (isLoaded) {
      return (
        <div className="acc_form mx-auto">
          <h3 className="text-center gv-font">Actualizar Perfil</h3>
          <form onSubmit={ (e) => this.handleSubmit(e) }>
            <div className="form-group">
              <label htmlFor="username">Usuario</label>
              <input type="text" className="form-control" id="username"
                pattern="[A-Za-z0-9]+"
                title="Debe contener solo letras y numeros"
                placeholder="Usuario" defaultValue={ user.username }/>
            </div>
            <div className="form-group">
              <label htmlFor="email">Correo electronico</label>
              <input type="email" className="form-control" id="email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
                title="Debe contener el simbolo '@' seguido de un dominio"
                placeholder="Correo electronico"
                defaultValue={ user.email }/>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">Actualizar</button>
            </div>
          </form>
        </div>
      )
    } else if (isLoaded == null) {
      return (<Loading />)
    } else {
      return (<Error />)
    }
  }
}
