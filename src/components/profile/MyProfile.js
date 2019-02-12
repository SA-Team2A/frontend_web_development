import React, { Component } from 'react'

// Assets
import user_img from '../../assets/user.svg'
import { auth_req } from '../../js/request'

// Components
import Error from '../utilities/Error'
import RecipesList from './RecipesList'
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


  render() {
    const { isLoaded, user, recipes, collections } = this.state
    // (Imagen, Nombre, Editar, Seguidores, Seguidos, Redes Sociales)

    if (isLoaded) {
      document.title = user.username
      return (
        <div className="container">
          <div className="row">
            <div className="mt-md-5 mx-auto">
              <img src={ user_img } className="rounded-circle"
                alt="profileImage" width="175"/>
              <h1 className="text-center">{ user.username }</h1>
            </div>

          </div>
          <div className="row">
            <ul className="nav nav-tabs col-12 nav-fill pr-0" id="myTab" role="tablist">
              <li className="nav-item">
                <a className="nav-link link-primary active" id="collections-tab" data-toggle="tab"
                  href="#collections" role="tab" aria-controls="collections"
                  aria-selected="true">Colecciones</a>
              </li>
              <li className="nav-item">
                <a className="nav-link link-primary" id="favorites-tab" data-toggle="tab"
                  href="#favorites" role="tab" aria-controls="favorites"
                  aria-selected="false">Favoritos</a>
              </li>
              <li className="nav-item">
                <a className="nav-link link-primary" id="myRecipes-tab" data-toggle="tab"
                  href="#myRecipes" role="tab" aria-controls="myRecipes"
                  aria-selected="false">Mis Recetas</a>
              </li>
            </ul>
            <div className="tab-content p-md-3" id="myTabContent">
              <div className="tab-pane fade show active" id="collections"
                role="tabpanel" aria-labelledby="home-tab">
                <CollectionsList own={true} collections={ collections } />
              </div>
              <div className="tab-pane fade" id="favorites" role="tabpanel"
                aria-labelledby="profile-tab">
                Aqui van mis favoritos
              </div>
              <div className="tab-pane fade" id="myRecipes" role="tabpanel"
                aria-labelledby="contact-tab">
                <RecipesList own={true} recipes={ recipes } />
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
