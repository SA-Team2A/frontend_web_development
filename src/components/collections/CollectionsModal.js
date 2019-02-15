import React, { Component } from 'react'

// Components
import Error from '../utilities/Error'
import Loading from '../utilities/Loading'
import { auth_req } from '../../js/request'

export default class CollectionsModal extends Component {

  constructor(props) {
    super(props)
    // this.checked = []
    this.state = {
      collections: [],
      isLoaded: null,
      checked: []
    }
  }

  componentDidMount() {
    const body = {
      query: `{
        collections: getMyCollections {
          id
          user_id
          name
        }
      }`
    }

    auth_req(body).then(
      res => {
        const collections = res.data.data.collections
        this.setState({
          collections: collections,
          checked: new Array(collections.length).fill(false),
          isLoaded: true
        })
        // this.checked = new Array(collections.length).fill(false)
      }
    ).catch(
      err => {
        this.setState({ isLoaded: false })
      }
    )
  }

  handleChange(e, i) {
    console.log(this.state.checked)
    const curr = this.state.checked.slice()
    curr[i] = e.target.checked
    this.setState({ checked: curr })
  }

  handleClick(e) {
    e.preventDefault()
    const { collections, checked } = this.state
    const { recipe_id } = this.props
    var body = { query: null, variables: null }
    for (var i = 0; i < collections.length; i++) {
      if (!checked[i]) continue
      body.query = `mutation addToCollections($input: CollectionRecipeInput!) {
        addToCollection(input: $input) {
          id
        	collection_id
        	recipe_id
        }
      }`
      body.variables = {
        input: {
          collection_id: collections[i].id,
          recipe_id: recipe_id
        }
      }
      auth_req(body).then(
        res => {
          console.log(res.data.data)
        }
      ).catch(
        err => {
          console.log(err.response)
        }
      )
    }
  }

  render() {
    const { isLoaded, collections, checked } = this.state
    if (isLoaded) {
      return (
        <div>
          <div className="modal fade" id="add_to_col_modal" tabIndex="-1" role="dialog"
            aria-labelledby="collections_modal" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="collection_modal">Agregar a colección</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  {
                    collections.map( (c,i) => (
                      <div className="form-check" key={ c.id }>
                        <input className="form-check-input" type="checkbox"
                          onChange={ e => this.handleChange(e, i) }
                          checked={ checked[i] }/>
                        <label className="form-check-label" htmlFor="defaultCheck1">
                            { c.name }
                        </label>
                      </div>)
                    )
                  }
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">
                    Cerrar
                  </button>
                  <button type="button" className="btn btn-primary mt-0"
                    data-dismiss="modal" onClick={ e => this.handleClick(e) }>
                    Agregar
                  </button>
                </div>
              </div>
            </div>
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
