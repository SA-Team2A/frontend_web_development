import React from 'react'
import ReactDOM from 'react-dom'

// JS
import 'bootstrap'
import * as serviceWorker from './js/serviceWorker'

// CSS
import 'animate.css/animate.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'material-icons/iconfont/material-icons.css'

// SASS
import './styles/sass/app.sass'

// Components
import { BrowserRouter as Router } from 'react-router-dom'
import RoutesBuilder from './components/router/RoutesBuilder'

// App
ReactDOM.render(
  <Router>
    <RoutesBuilder />
  </Router>,
  document.getElementById('root')
)
serviceWorker.unregister()
