import React, { Component } from 'react'

// Assets
import no_collection from '../../assets/collection.png'

// Components
import { Link } from 'react-router-dom'

export default class CollectionsList extends Component {
  render() {
    const { collections } = this.props
    const list = collections.map( c =>
      (<Link to={ `/collection/${c.id}` } className="list-group-item list-group-item-action" key={ c.id }>
        <div className="d-flex w-100 justify-content-between">
          <div className="col-md-1 my-auto">
            <img src={ no_collection } alt="una foto" className="w-100"/>
          </div>
          <div className="col-md-11 my-auto">
            <h5 className="mb-1">{ c.name }</h5>
          </div>
        </div>
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
