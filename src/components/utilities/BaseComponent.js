import React, { Component } from 'react'

// Components
import Error from '../utilities/Error'
import Loading from '../utilities/Loading'

export default class BaseComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoaded: null
    }
  }


  componentDidMount() {
    document.title = 'title'
    this.setState({ isLoaded: true })
  }


  render() {
    const { isLoaded } = this.state

    if (isLoaded) {
      return (
        <div>
          Hola, soy la base
        </div>
      )
    } else if (isLoaded == null) {
      return <Loading />
    } else {
      return <Error />
    }
  }
}
