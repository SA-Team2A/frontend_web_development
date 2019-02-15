import React from 'react'

// Assets
import no_recipe from '../../assets/recipe.jpg'

// Components

export default ({ recipe }) => {
  const { name, photos } = recipe
  const recipe_photo = photos.length > 0 ? photos[0] : no_recipe
  return (
    <div>
      <div className="d-flex w-100 justify-content-between">
        <div className="col-md-1 my-auto">
          <img src={ recipe_photo } alt="una foto" className="w-100"/>
        </div>
        <div className="col-md-11 my-auto">
          <h5 className="mb-1">{ name }</h5>
        </div>
      </div>
    </div>

  )
}
