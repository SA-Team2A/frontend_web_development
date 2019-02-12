import React, { Component } from 'react'

// Assets

// Components
import MyProfile from './MyProfile'
import OtherProfile from './OtherProfile'
import Error from '../utilities/Error'

export default class Profile extends Component {

  constructor(props) {
    super(props)
    this.MY_PROFILE = 0
    this.OTHER_PROFILE = 1
    this.state = {
      view: null
    }
  }

  componentDidMount() {
    const { match: { params: { param } } } = this.props
    if (!param){
      this.setState({ view: this.MY_PROFILE })
    } else {
      this.setState({ view: this.OTHER_PROFILE })
    }
  }

  render() {
    const { view } = this.state
    const { match: { params: { param } } } = this.props
    return (view === this.MY_PROFILE) ? (<MyProfile />) :
      (view === this.OTHER_PROFILE) ? (<OtherProfile id={ param } />) : (<Error />)
  }
}
