import React, { Component } from 'react'

// Assets
import { auth_req } from '../../js/request'
import user_img from '../../assets/user.svg'

// Components
import Error from '../utilities/Error'
import Loading from '../utilities/Loading'

export default class RecipeForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoaded: null,
      difficulties: [],
      ingredients: [],
      steps: []
    }
  }

  componentDidMount() {
    document.title = 'Publica una receta'
    const body = {
      query: '{ difficulties: getDifficulties { _id description } }',
    }

    auth_req(body).then(
      res => {
        this.setState({
          difficulties: res.data.data.difficulties,
          isLoaded: true
        })
      }
    ).catch(
      err => {
        this.setState({ isLoaded: false })
      }
    )
  }

  handleSubmit(e) {
    e.preventDefault()
    const body = {
      query: `
        mutation NewRecipe($recipe: New_recipe!) {
          createRecipe(recipe: $recipe) {
            _id
            name
            description
            difficulty {
              description
            }
            portions
            preparation_time
            photos
            ingredients
            steps
            user_id
          }
        }
      `,
      variables: {
        recipe: {
          name: document.getElementById('title').value,
          description: document.getElementById('description').value,
          difficulty_id: document.getElementById('difficulty').value,
          portions: parseInt(document.getElementById('portions').value),
          preparation_time: parseInt(document.getElementById('preparation_time').value),
          ingredients: this.state.ingredients,
          steps: this.state.steps
        }
      }
    }
    console.log(body.variables);

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

  addIngredient(e) {
    e.preventDefault()
    const newIngredient = document.getElementById('ingredient').value
    const ingredients = this.state.ingredients.slice()
    ingredients.push(newIngredient)
    this.setState({ ingredients })
  }

  addStep(e) {
    e.preventDefault()
    const newStep = document.getElementById('step').value
    const steps = this.state.steps.slice()
    steps.push(newStep)
    this.setState({ steps })
  }

  render() {
    const { isLoaded, ingredients, steps, difficulties } = this.state

    if (isLoaded) {
      return (
        <div className="col-md-8 offset-md-2">
          <h1 className="text-center gv-font">Sube tus recetas y compartelas con la comunidad</h1>
          <form onSubmit={ (e) => this.handleSubmit(e) }>
            <div className="form-row form-group">
              <input type="text" className="form-control" id="title"
                placeholder="Escribe el título aquí"/>
            </div>
            <div className="form-row form-group">
              <div className="d-flex mr-5">
                <i className="material-icons align-self-center">alarm</i>
                <input type="number" className="recipe-input form-control align-self-center mx-2" id="preparation_time"/>
                <span className="align-self-center">min</span>
              </div>
              <div className="d-flex mr-5">
                <i className="material-icons align-self-center">short_text</i>
                <select className="form-control align-self-center mx-2" id="difficulty">
                  {
                    difficulties.map( d =>
                      (<option key={ d._id } value={ d._id }>
                        { d.description }
                      </option>)
                    )
                  }
                </select>
              </div>
              <div className="d-flex">
                <input type="number" className="form-control recipe-input align-self-center mr-2" id="portions"/>
                <span className="align-self-center">Porciones</span>
              </div>
            </div>
            <div className="form-row">
              <div className="col-md-2 text-center">
                <img src={ user_img } alt="una foto" className="w-100 rounded-circle"/>
                <span>Usuario</span>
              </div>
              <div className="col-md-10 d-flex">
                <textarea className="form-control align-self-center" id="description" rows="3"
                 placeholder="Cuéntanos un poco más sobre tu receta">
                </textarea>
              </div>
            </div>
            <hr/>
            <div className="form-group">
              <h2 className="gv-font">Ingredientes</h2>
              <p>Escribe los ingredientes de tu receta.</p>
              <div className="row">
                <div className="col-md-10">
                  <input type="text" className="form-control" id="ingredient"
                    placeholder="Agrega un ingrediente."/>
                </div>
                <div className="col-md-2 text-center d-flex">
                  <button type="submit" onClick={ e => this.addIngredient(e) }
                    className="btn btn-primary align-self-center m-0">
                    Agregar
                  </button>
                </div>
              </div>
              <ul id="ingredients" className="list-group list-group-flush">
                {
                  ingredients.map( (i, index) =>
                    (<li key={ index } className="list-group-item d-flex">
                      <i className="material-icons align-self-center">close</i>
                      <span className="align-self-center">
                        { i }
                      </span>
                    </li>)
                  )
                }
              </ul>
            </div>
            <div className="form-group">
              <h2 className="gv-font">Preparación</h2>
              <p>Escribe los pasos de tu receta.</p>
              <div className="row">
                <div className="col-md-10">
                  <input type="text" className="form-control" id="step"
                    placeholder="Agrega un paso."/>
                </div>
                <div className="col-md-2 text-center d-flex">
                  <button type="submit" onClick={ e => this.addStep(e) }
                    className="btn btn-primary align-self-center m-0">
                    Agregar
                  </button>
                </div>
              </div>
              <ul className="list-group list-group-flush">
                {
                  steps.map( (s, index) =>
                    (<li key={ index } className="list-group-item d-flex">
                      <i className="material-icons align-self-center">close</i>
                      <span className="align-self-center">
                        { s }
                      </span>
                    </li>)
                  )
                }
              </ul>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">Sube tu receta</button>
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
