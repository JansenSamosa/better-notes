import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import Login from './components/auth/Login'
import Register from './components/auth/Register'
import BoardPage from './components/boardPage/BoardPage'
import BoardsPage from './components/boardsPage/BoardsPage'
import HomePage from './components/homePage/HomePage'

import { loadUser } from './actions/authActions.js'

import store from './store.js'
import './App.css'

export class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser())
  }

  render() {
    return (  
      <div className='App'>
        <Provider store={store} >
          <Router>
            <Switch>
              <Route path='/login' component={Login} />
              <Route path='/register' component={Register} />
              <Route path='/boards/:id' component={BoardPage} />
              <Route path='/boards' component={BoardsPage} />
              <Route path='/' component={HomePage} />
            </Switch>
          </Router>
        </Provider>
      </div>
    )
  }
}

export default App
