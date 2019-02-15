import React, { Component } from 'react'

// Assets

// Components
import RecipeTile from './RecipeTile'
import { Link } from 'react-router-dom'

export default class RecipesList extends Component {

  render() {
    const { recipes } = this.props

    const list = recipes.map((recipe, index) =>
      (<Link to={ `/recipe/${ recipe._id }` } className="list-group-item list-group-item-action" key={ index }>
        <RecipeTile recipe={ recipe } />
      </Link>)
    )

    return (
      <div>
        <div className="row">
          <ul className="list-group w-100">
            { list }
          </ul>
        </div>
      </div>
    )
  }
}
