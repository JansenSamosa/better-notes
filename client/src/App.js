import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { Provider } from 'react-redux'

import Login from './components/auth/Login'
import Register from './components/auth/Register'

import { loadUser, logoutUser } from './actions/authActions.js'

import store from './store.js'
import './App.css'

export class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser())
  }

  authButtons = () => {
    if(store.getState().auth.token !== null) {
      return (
        <button onClick={() => {store.dispatch(logoutUser()); this.forceUpdate()}}>Logout</button>
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
                {this.authButtons()}
              </Route>
            </Switch>
          </Router>
        </Provider>
      </div>
    )
  }
}

export default App
