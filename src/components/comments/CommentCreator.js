import React, { Component } from 'react'


// Assets
import { auth_req } from '../../js/request'
import user_img from '../../assets/user.svg'

export default class BaseComponent extends Component {

  handleSubmit(e) {
    e.preventDefault()

    const { currentUser: { id }, recipe_id } = this.props
    const body = {
      query: `mutation makeComment($comment: CommentInput!) {
        createComment(comment: $comment) {
          _id
          user_id
          recipe_id
          comment
          created_date
        }
      }`,
      variables: {
        comment: {
          user_id: parseInt(id),
          recipe_id,
          comment: document.getElementById('comment').value,
          created_date: `${new Date().getTime()}`
        }
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
    const { currentUser } = this.props

    return (
      <form className="w-100" onSubmit={ (e) => this.handleSubmit(e) }>
        <div className="form-group row">
          <div className="col-md-2 text-center my-auto">
            <img src={ user_img } alt="una foto" className="w-100 rounded-circle"/>
          <span>{ currentUser.username }</span>
          </div>
          <div className="col-md-8">
            <textarea className="form-control" id="comment" rows="3"
             placeholder="¿Tienes algun comentario?">
            </textarea>
          </div>
          <div className="col-md-2 text-center">
            <button type="submit" className="btn btn-primary">Enviar</button>
          </div>
        </div>
      </form>
    )
  }
}
