import React, { Component } from 'react'

// Assets
import add_button from '../../assets/add_button.png'

// Components
import RecipeTile from './RecipeTile'
import { Link } from 'react-router-dom'

export default class RecipesList extends Component {

  render() {
    const { recipes, own } = this.props

    const list = recipes.map((recipe, index) =>
      (<li key={ index } className="d-inline-block m-2">
        <RecipeTile recipe={ recipe } />
      </li>)
    )

    return (
      <div className="container mx-auto">
        <ul className="p-0 text-center">
          {
            own ?
            <li key={0} className="d-inline-block m-2">
              <div className="card recipe ">
                <img className="card-img-top" src={ add_button } alt="recipeImage"/>
                <div className="card-body">
                  <Link to='/new_recipe'>
                    <h5 className="card-title">Crear nueva receta</h5>
                  </Link>
                </div>
              </div>
            </li>
            : null
          }
          { list }
        </ul>
      </div>
    )
  }
}
