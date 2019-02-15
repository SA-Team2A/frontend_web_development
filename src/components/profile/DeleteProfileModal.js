import React, { Component } from 'react'

// Assets
import { auth_req } from '../../js/request'
import store from '../../js/store'
import { logout } from '../../js/actions'

export default class DeleteProfileModal extends Component {

  handleClick(e) {
    e.preventDefault()
    const body = {
      query: `
        mutation {
          deleteMyProfile {
            id
            username
            email
          }
        }
      `
    }

    auth_req(body).then(
      res => {
        console.log(res.data.data)
        localStorage.removeItem('token')
        store.dispatch(logout())
      }
    ).catch(
      err => {
        console.log(err.data.data)
      }
    )
  }

  render() {
    return (
      <div className="modal fade" id="delete_profile" tabIndex="-1" role="dialog"
        aria-labelledby="collection_modal" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="delete_profile_modal">Eliminar perfil</h5>
            <button type="button" className="close" data-dismiss="modal"
              aria-label="Close" onClick={ (e) => this.handleClick(e) }>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>¿Estás seguro de que quieres borrar tu perfil? :(</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">
                Cancelar
              </button>
              <button type="button" className="btn btn-danger mt-0"
                data-dismiss="modal" onClick={ e => this.handleClick(e) }>
                Borrar
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
