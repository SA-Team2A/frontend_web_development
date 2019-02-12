import React, { Component } from 'react'

// Assets
import { auth_req } from '../../js/request'

// Components
import Error from '../utilities/Error'
import Loading from '../utilities/Loading'
import RecipeTile from '../profile/RecipeTile'

export default class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoaded: null,
      recipes: []
    }
  }

  componentDidMount() {
    document.title = 'Cucinapp'
    const body = {
      query: `{
        recipes:getRecipes {
          _id
          name
          description
          photos
        }
      }`
    }

    auth_req(body).then(
      res => {
        this.setState({
          recipes: res.data.data.recipes,
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


  render() {
    const { isLoaded, recipes } = this.state

    if (isLoaded) {

      const list = recipes.map((recipe, index) =>
        (<li key={ index } className="d-inline-block m-2">
          <RecipeTile recipe={ recipe } />
        </li>)
      )

      return (
        <div className="container">
          <h2 className="gv-font">Recetas populares</h2>
          <div className="container mx-auto">
            <ul className="p-0 text-center">
              { list }
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
