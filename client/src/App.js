import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { Provider } from 'react-redux'

import Login from './components/auth/Login'
import Register from './components/auth/Register'

import Navbar from './components/overlay/Navbar.js'

import { loadUser } from './actions/authActions.js'

import store from './store.js'
import './App.css'

export class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser())
  }
  notesRender = () => {
    if(store.getState().auth.token !== null) {
      return (
        <div>
          <Navbar />
        </div>
      )
      
    } else {
      return (
        <Link to='/login'> Login</Link>
      )
    }
  }
  render() {
    return (  
      <div className='App'>
        <Provider store={store} >
          <Router>
            <Switch>
              <Route path='/login'>
                <Login />
              </Route>
              <Route path='/register'>
                <Register />
              </Route>
              <Route path='/'>
                {this.notesRender()}
              </Route>
            </Switch>
          </Router>
        </Provider>
      </div>
    )
  }
}

export default App
