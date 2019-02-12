import React, { Component } from 'react'

// Assets
import { join } from '../../js/utilities'
import { auth_req } from '../../js/request'
import user_img from '../../assets/user.svg'

// Components
import { Link } from 'react-router-dom'
import Error from '../utilities/Error'
import Loading from '../utilities/Loading'
import Comment from '../comments/Comment'
import CommentCreator from '../comments/CommentCreator'

export default class Recipe extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoaded: null,
      recipe: null,
      users: [],
      comments: [],
      currentUser: null
    }
  }


  componentDidMount() {
    const { match: { params: { param } } } = this.props
    const body = {
      query: `query getRecipe($id: ID!){
        recipe: getRecipeById(_id: $id) {
          _id
          name
          description
          difficulty {
            _id
            description
          }
          preparation_time
          portions
          photos
          ingredients
          steps
          user_id
        }
        comments: getCommentsByRecipeId(recipe_id: $id) {
          user_id
          comment
          created_date
        }
        users: getUsers {
          id
          username
        }
        currentUser: getMyUser {
          id
          username
        }
      }`,
      variables: {
        id: param
      }
    }
    auth_req(body).then(
      res => {
        console.log(res.data.data)
        this.setState({
          recipe: res.data.data.recipe,
          comments: res.data.data.comments,
          users: res.data.data.users,
          currentUser: res.data.data.currentUser,
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

  mapList(list) {
    return list.map(
      (item, index) => (<li key={ index } value={ index }>{ item }</li>)
    )
  }

  render() {
    const { isLoaded, recipe, comments, users, currentUser } = this.state
    const { match: { params: { param } } } = this.props

    if (isLoaded) {
      document.title = recipe.name
      const { name, preparation_time, difficulty, portions, description, user_id,
              ingredients, steps, photos } = recipe

      const joinedQuery = join(comments, 'user_id', users, 'id')
      const username = users.filter( u => u.id === user_id )[0].username

      var carrouselPhotos = ( photos.length > 0 ) ? (
        <div id="carouselPhotos" className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">
            <li data-target="#carouselPhotos" data-slide-to="0" className="active"></li>
            <li data-target="#carouselPhotos" data-slide-to="1"></li>
            <li data-target="#carouselPhotos" data-slide-to="2"></li>
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img className="d-block w-100" src="" alt="First slide"/>
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src="" alt="Second slide"/>
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src="" alt="Third slide"/>
              </div>
            </div>
            <a className="carousel-control-prev" href="#carouselPhotos" role="button" data-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselPhotos" role="button" data-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
            </a>
          </div>
        ) : null


      return (
        <div className="col-md-8 offset-md-2">
          { carrouselPhotos }
          <div className="row">
            <h1 className="">{ name }</h1>
          </div>
          <div className="row">
            <i className="material-icons">alarm</i>
          <span className="mr-5">{ preparation_time } minutos </span>
            <i className="material-icons">short_text</i>
            <span className="mr-5">{ difficulty.description } </span>
            <span className="mr-5">{ portions } Porciones</span>
          </div>
          <div className="row mt-3">
            <div className="col-md-2 text-center my-auto">
              <img src={ user_img } alt="una foto" className="w-100 rounded-circle"/>
              <span>{ username }</span>
            </div>
            <div className="col-md-10">
              <p>{ description }</p>
              <span>Conoce más sobre </span>
              <Link to={"/profile/" + user_id }>{ username }</Link>
            </div>
          </div>
          <div className="row d-flex justify-content-center mt-3">
            <button type="button" className="btn btn-outline-primary mr-2">
              Agregar a Favoritos
            </button>
            <button type="button" className="btn btn-outline-primary">
              Agregar a Colecciones
            </button>
          </div>
          <hr/>
          <div className="row">
            <h2 className="gv-font">Ingredientes</h2>
          </div>
          <div className="row">
            <ul>
              { this.mapList(ingredients) }
            </ul>
          </div>
          <div className="row">
            <h2 className="gv-font">Preparación</h2>
          </div>
          <div className="row">
            <ol start={'1'}>
              { this.mapList(steps) }
            </ol>
          </div>
          <hr/>
          <div className="row">
            <CommentCreator currentUser={ currentUser } recipe_id={ param }/>
          </div>
          <div className="row">
            <ul className="list-group w-100">
              {
                joinedQuery.map( (c, i) => (
                  <li key={ i } value={ i } className="list-group-item">
                    <Comment item={ c }/>
                  </li>
                ))
              }
            </ul>
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
