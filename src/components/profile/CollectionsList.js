import React, { Component } from 'react'

// Assets
import add_button from '../../assets/add_button.png'
import no_image from '../../assets/no_image.jpg'

// Components
import { Link } from 'react-router-dom'
import CollectionCreator from '../collections/CollectionCreator'

export default class CollectionsList extends Component {
  render() {
    const { collections, own } = this.props
    const list = collections.map( c =>
      (<li key={c.id} className="d-inline-block m-2">
        <div className="card recipe ">
          <img className="card-img-top" src={ no_image } alt="recipeImage"/>
          <div className="card-body">
            <Link to='#!'>
              <h5 className="card-title">{ c.name }</h5>
            </Link>
          </div>
        </div>
      </li>)
    )
    return (
      <div>
        <CollectionCreator />
        <ul className="p-0 text-center">
          {
            own ?
            <li key={0} className="d-inline-block m-2" data-toggle="modal" data-target="#create_col_modal">
              <div className="card recipe ">
                <img className="card-img-top" src={ add_button } alt="recipeImage"/>
                <div className="card-body">
                  <Link to='#!'>
                    <h5 className="card-title">Crear nueva colección</h5>
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
