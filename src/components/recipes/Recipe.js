import React, { Component } from 'react'

// Assets
import { auth_req } from '../../js/request'
import user_img from '../../assets/user.svg'

// Components
import { Link } from 'react-router-dom'
import Error from '../utilities/Error'
import Loading from '../utilities/Loading'
import CommentCreator from '../comments/CommentCreator'

export default class Recipe extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoaded: null,
      recipe: null,
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
          ingredients
          steps
          user_id
        }
        comments: getCommentsByRecipeId(recipe_id: $id) {
          user_id
          comment
          username
          created_date
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
    const { isLoaded, recipe, comments, currentUser } = this.state
    const { match: { params: { param } } } = this.props

    if (isLoaded) {
      document.title = recipe.name
      const { name, preparation_time, difficulty, portions, description, user_id,
              ingredients, steps } = recipe
      const username = currentUser.username

      return (
        <div className="col-md-8 offset-md-2">
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
            <CommentCreator currentUser={ currentUser } recipe_id={ param }
              comments= { comments }/>
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
