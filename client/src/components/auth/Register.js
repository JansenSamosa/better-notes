import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import HomeBtn from '../nav/homeBtn'

import { registerUser } from '../../actions/authActions.js'
import { returnError } from '../../actions/errorActions.js'

import './auth.css'

export class Register extends Component {
    state = {
        email: null,
        password: null,
        confirmPass: null,
    }

    register = (e) => {
        e.preventDefault()

        if(this.state.password !== this.state.confirmPass) {
            this.props.returnError('Passwords do not match', 400, 'REGISTER_FAIL')
        }
        else {
            const newUser = {
                email: this.state.email.toLowerCase(),
                password: this.state.password
            }

            this.props.registerUser(newUser)
        }
    }

    successMsg = () => {
        if(this.props.error.id === 'REGISTER_SUCCESS') {
            return (
                <div className='auth-success'>
                    <p>Success! Login <Link to='/login'>here</Link></p>
                </div>
            )
        }
        else return null
    }
    errorMsg = () => {
        if(this.props.error.id === 'REGISTER_FAIL') {
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
                <h1>Register</h1>

                {this.successMsg()}
                {this.errorMsg()}

                <form className='auth-register-form'>
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
                        type='password' 
                        placeholder='Confirm password'
                        onChange={e => this.setState({...this.state, confirmPass: e.target.value})}
                    />
                    <input 
                        type='submit' 
                        value='Register'
                        onClick={this.register.bind(this)}
                    />
                </form>
                <p id='to-login'>Already have an account? Login <Link to='/login'>here</Link></p>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    error: state.error
})

export default connect(mapStateToProps, {registerUser, returnError})(Register)
