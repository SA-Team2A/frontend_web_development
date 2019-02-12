import React, { Component } from 'react'

// Assets
import { auth_req } from '../../js/request'

export default class CollectionCreator extends Component {

  handleClick(e) {
    e.preventDefault()
    const body = {
      query: `
        mutation CreateCol($name: String!) {
          createCollection(name: $name) {
            id
          	user_id
          	name
          }
        }
      `,
      variables: {
        name: document.getElementById('collection-name').value
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

  render() {
    return (
      <div className="modal fade" id="create_col_modal" tabIndex="-1" role="dialog"
        aria-labelledby="collection_modal" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="collection_modal">Crear colección</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="recipient-name" className="col-form-label">Nombre:</label>
                  <input type="text" className="form-control" id="collection-name"/>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">
                Cerrar
              </button>
              <button type="button" className="btn btn-primary mt-0"
                data-dismiss="modal" onClick={ e => this.handleClick(e) }>
                Crear
              </button>
            </div>
          </div>
        </div>
      </div>
    )

  }
}
