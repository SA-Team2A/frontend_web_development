import React from 'react'

// Assets
import no_image from '../../assets/no_image.jpg'

// Components
import { Link } from 'react-router-dom'

export default ({ recipe }) => {
  const { name, photos } = recipe
  const recipe_photo = photos.length > 0 ? photos[0] : no_image
  return (
    <div className="card recipe">
      <img className="card-img-top" src={ recipe_photo } alt="recipeImage"/>
      <div className="card-body">
        <Link to={`/recipe/${recipe._id}`}>
          <h5 className="card-title">{ name }</h5>
        </Link>
      </div>
    </div>
  )
}
