import React, { Component } from 'react'

// Components
import Error from '../utilities/Error'
import Loading from '../utilities/Loading'
import RecipesList from '../profile/RecipesList'
import { auth_req } from '../../js/request'

export default class Collection extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoaded: null,
      recipes: null,
      currentUser: null,
      collection: null
    }
  }

  componentDidMount() {
    const { match: { params: { param } } } = this.props
    const body = {
      query: `query collectionView($id: ID!) {
        collection: getCollectionById(id: $id){
          id
          name
          user_id
        }
        currentUser: getMyUser { username email }
        recipes: getCollectionRecipeById(id: $id) {
          ID
          Collection_id
          Recipe_id
          _id
          name
          portions
        }
      }`,
      variables: {
        id: param
      }
    }

    auth_req(body).then(
      res => {
        console.log(res.data.data)
        this.setState({
          collection: res.data.data.collection,
          recipes: res.data.data.recipes,
          currentUser: res.data.data.currentUser,
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
    const { isLoaded, recipes, collection } = this.state

    if (isLoaded) {
      document.title = collection.name

      return (
        <div className="container">
          <div className="row">
            <div className="col-sm-10 ">
              <h1 className="cookie-font"> { collection.name } </h1>
            </div>
            <div className="col-sm-2">
              <button type="button" className="btn btn-light" data-toggle="modal" data-target="#create_col_modal">
                <i className="material-icons">edit</i>
              </button>
              <button type="button" className="btn btn-light" data-toggle="modal" data-target="#create_col_modal">
                <i className="material-icons">delete</i>
              </button>
            </div>
          </div>
          <RecipesList recipes={ recipes } />
        </div>
      )
    } else if (isLoaded == null) {
      return <Loading />
    } else {
      return <Error />
    }
  }

}
