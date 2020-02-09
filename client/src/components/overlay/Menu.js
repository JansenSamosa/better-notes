import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { logoutUser } from '../../actions/authActions.js'
import { getBoard } from '../../actions/boardActions'

import logoutIcon from '../../icons/logouticon.png'
import './menu.css'

export class Menu extends Component {
    state = {
        logoutRed: false
    }
    logout = () => {
        this.props.logoutUser()
        this.setState({logoutRed: true})
    }
    redirects = () => {
        if(this.state.logoutRed) {
            this.setState({logoutRed:false})
            return <Redirect to='/login' />
        }
    }
    getClassName = () => {
        if(this.props.open) {
            return 'nav-menu-open'
        }else if (!this.props.open) {
            return 'nav-menu-closed'
        }
    }
    render() {
        return (
            <div style={{position:'absolute', top:'0', left:'0'}} >
                <div className={this.getClassName()}>
                    <button onClick={() => this.props.getBoard('5e405de59945ff54dcf8e885')}>
                        asdas
                    </button>
                    <button 
                        className='nav-menu-logout' 
                        onClick={this.logout}
                    > 
                        <img src={logoutIcon} alt=''></img> 
                    </button>
                </div>
                {this.redirects()}
            </div>
        )
    }
}

export default connect(null, {logoutUser, getBoard})(Menu)
