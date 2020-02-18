import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import HomeBtn from '../nav/homeBtn'

import { loginUser } from '../../actions/authActions.js'
import { returnError } from '../../actions/errorActions.js'

export class Login extends Component {
    state = {
        email: null,
        password: null,
    }
    login = (e) => {
        e.preventDefault()
  
        const userInfo = {
            email: this.state.email,
            password: this.state.password
        }

        this.props.loginUser(userInfo)
        
    }
    successMsg = () => {
        if(this.props.error.id === 'LOGIN_SUCCESS') {
            return (
                <div className='auth-success'>
                    <p>Success! Click <a href='/'>here</a> to continue</p>
                </div>
            )
        }
        else return null
    }
    errorMsg = () => {
        if(this.props.error.id === 'LOGIN_FAIL') {
            return (
                <div className='auth-error'>
                    <p>{`${this.props.error.status}: ${this.props.error.msg}`}</p>
                </div>
            )
        }
        else return null
    }
    render() {
        return (
            <div className='auth-base'>
                <HomeBtn />
                <h1>Login</h1>

                {this.successMsg()}
                {this.errorMsg()}
                
                <form className='auth-login-form'>
                    <input 
                        type='text' 
                        placeholder='Email'
                        onChange={e => this.setState({...this.state, email: e.target.value})}
                    />
                    <input 
                        type='password' 
                        placeholder='Password'
                        onChange={e => this.setState({...this.state, password: e.target.value})}
                    />    
                    <input 
                        type='submit' 
                        value='Login'
                        onClick={this.login}
                    />
                    </form>
                    <p id='to-register'>Dont have an account? Register <Link to='/register'>here</Link></p>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    error: state.error
})

export default connect(mapStateToProps, {loginUser, returnError})(Login)
