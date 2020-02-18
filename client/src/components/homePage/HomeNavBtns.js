import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { logoutUser } from '../../actions/authActions'

export class HomeNavBtns extends Component {
    state = {
        redirect: false,
        redirectTo: null
    }
    redirects = () => {
        if(this.state.redirect) {
            const temp = this.state.redirectTo
            console.log(temp)
            this.setState({redirect: false, redirectTo: null})
            return <Redirect to={temp} />
        }
    }
    mkRed = to => {
        this.setState({redirect: true, redirectTo:to})
    }

    toBoards = () => {
        if(!this.props.auth.isAuthenticated) {
            window.alert('Login to access this feature')
        }
        else this.mkRed('/boards')
    }
    authButtons = () => {
        if(!this.props.auth.isAuthenticated) {
            return (
                <div> 
                    <button onClick={this.mkRed.bind(this, '/login')}>Login</button>
                    <button onClick={this.mkRed.bind(this, '/register')}>Register</button>
                </div>
            )
        }
        else {
            return <button onClick={this.props.logoutUser}>Logout</button>
        }
    }
    render() {
        return (
            <div className='home-btns'>
                <button onClick={this.toBoards}>Your Boards</button>
                {this.authButtons()}
                {this.redirects()}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {logoutUser})(HomeNavBtns)
