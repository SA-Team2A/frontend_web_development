import React, { Component } from 'react'

// Assets
import user_img from '../../assets/user.svg'
import { auth_req } from '../../js/request'

// Components
import Error from '../utilities/Error'
import RecipesList from './RecipesList'
import { Link } from 'react-router-dom'
import Loading from '../utilities/Loading'
import CollectionsList from './CollectionsList'

export default class MyProfile extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoaded: null,
      user: null,
      collections: null,
      recipes: null
    }
  }

  componentDidMount() {
    const body = {
      query: `{
        user:getMyUser { username email }
        recipes:getMyRecipes {
          _id
          name
          description
          photos
        }
        collections:getMyCollections {
          id
          name
        }
      }`
    }

    auth_req(body).then(
      res => {
        this.setState({
          user: res.data.data.user,
          recipes: res.data.data.recipes,
          collections: res.data.data.collections,
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

  handleClick(e) {
    e.preventDefault()
    const body = {
      query: `
        mutation CreateCol($name: String!) {
          createCollection(name: $name) {
            id
          	user_id
          	name
          }
        }
      `,
      variables: {
        name: document.getElementById('collection-name').value
      }
    }
    auth_req(body).then(
      res => {
        console.log(res.data.data.createCollection)
        var currCollections = this.state.collections.slice()
        currCollections.push(res.data.data.createCollection)
        this.setState({
          collections: currCollections
        })
      }
    ).catch(
      err => {
        console.log(err.response)
      }
    )
  }


  render() {
    const { isLoaded, user, recipes, collections } = this.state
    // (Imagen, Nombre, Editar, Seguidores, Seguidos, Redes Sociales)

    if (isLoaded) {
      document.title = user.username
      return (
        <div>
          <div className="container">
            <div className="row">
              <div className="col-sm-12 col-md-3">
                <div className="mt-md-5 mx-auto">
                  <img src={ user_img } className="rounded-circle"
                    alt="profileImage" width="175"/>
                </div>
              </div>
              <div className="col-sm-12 col-md-8">
                <div className="mt-5">
                  <h1 className="">{ user.username }</h1>
                  <h5 className="">{ user.email }</h5>
                </div>
              </div>
              <div className="col-sm-12 col-md-1">
                <div className="mt-5">
                  <div className="dropdown">
                    <button className="btn btn-light dropdown-toggle"
                      type="button" id="dropdownMenuButton"
                      data-toggle="dropdown" aria-haspopup="true"
                      aria-expanded="false">
                      <i className="material-icons text-left">settings</i>
                    </button>
                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                      <Link to="#!" className="dropdown-item">Actualizar perfil</Link>
                      <Link to="#!" className="dropdown-item">Borrar perfil</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row  mt-3">
              <h1 className="cookie-font">Mis Recetas</h1>
            </div>
            <RecipesList own={true} recipes={ recipes } />
            <div className="row mt-3">
              <h1 className="cookie-font">Mis Colecciones</h1>
              <button type="button" className="btn btn-light" data-toggle="modal" data-target="#create_col_modal">
                <i className="material-icons">add_circle_outline</i>
              </button>
            </div>
            <CollectionsList own={true} collections={ collections } />
          </div>
          {/* Modal */}
          <div className="modal fade" id="create_col_modal" tabIndex="-1" role="dialog"
            aria-labelledby="collection_modal" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="collection_modal">Crear colección</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group">
                      <label htmlFor="recipient-name" className="col-form-label">Nombre:</label>
                      <input type="text" className="form-control" id="collection-name"/>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">
                    Cerrar
                  </button>
                  <button type="button" className="btn btn-primary mt-0"
                    data-dismiss="modal" onClick={ e => this.handleClick(e) }>
                    Crear
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    } else if (isLoaded == null) {
      return <Loading />
    } else {
      return <Error />
    }
  }
}
