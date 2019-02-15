import React, { Component } from 'react'

// Assets
import { auth_req } from '../../js/request'

// Components
import Error from '../utilities/Error'
import Loading from '../utilities/Loading'
import RecipesList from '../profile/RecipesList'

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
      return (
        <div className="container">
          <h2 className="gv-font">Recetas populares</h2>
          <div className="container mx-auto">
            <RecipesList own={false} recipes={ recipes } />
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
