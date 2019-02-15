import React from 'react'

// Components
import Comment from './Comment'

export default ({ list }) => {
  return (
    <ul className="list-group w-100">
      {
        list.map( (c, i) => (
          <li key={ i } value={ i } className="list-group-item">
            <Comment item={ c }/>
          </li>
        ))
      }
    </ul>
  )
}
