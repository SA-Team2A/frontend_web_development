import React, { Component } from 'react'

// Assets
import store from '../../js/store'
import { req } from '../../js/request'
import { login, logout } from '../../js/actions'

// Components
import Header from './Header'
import Footer from './Footer'
import Error from '../utilities/Error'
import Loading from '../utilities/Loading'

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoaded: null
    }
  }

  componentDidMount() {
    const body = {
      query: 'query Verify($token: String!) { verify(jwt: $token) }',
      variables: {
        token: localStorage.getItem('token')
      }
    }
    if (!!body.variables.token) {
      req(body).then(
        res => {
          let token = res.data.data.verify
          if (token) {
            store.dispatch(login())
            localStorage.setItem('token', token)
          } else {
            store.dispatch(logout())
            localStorage.removeItem('token')
          }
          this.setState({ isLoaded: true })
        }
      ).catch(
        err => {
          this.setState({ isLoaded: false })
        }
      )
    } else {
      this.setState({ isLoaded: true })
    }
  }

  render() {
    const { children } = this.props
    const { isLoaded } = this.state

    if (isLoaded) {
      return (
        <div>
          <Header />
          <main>
            { children }
          </main>
          <Footer />
        </div>
      )
    } else if (isLoaded == null) {
      return (<Loading />)
    } else {
      return (<Error />)
    }
  }
}
