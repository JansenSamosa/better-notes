import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import MenuBoards from './MenuBoards.js'
import { logoutUser } from '../../../../actions/authActions.js'
import { getAllBoards } from '../../../../actions/boardActions'

import homeIcon from '../../../../icons/homeicon.png'
import './menu.css'
import './menuMobile.css'

export class Menu extends Component {
    state = {
        redirect: false,
        redirectTo: null
    }
    toHome = () => {
        this.setState({redirect: true, redirectTo:'/'})
    }
    redirects = () => {
        if(this.state.redirect && this.state.redirectTo === '/') {
            this.setState({redirect: false, redirectTo:null})
            return <Redirect to='/' />
        }
    }
    getClassName = () => {
        if(this.props.open) {
            this.props.getAllBoards()
            return 'nav-menu-open'
        }else if (!this.props.open) {
            return 'nav-menu-closed'
        }
    }
    render() {
        return (
            <div style={{position:'absolute', top:'0', left:'0'}} >
                <div className={this.getClassName()}>
                    <MenuBoards />
                    <button 
                        className='nav-menu-homebutton' 
                        onClick={this.toHome}
                    > 
                        <img src={homeIcon} alt=''></img> 
                    </button>
                </div>
                {this.redirects()}
            </div>
        )
    }
}

export default connect(null, {logoutUser, getAllBoards})(Menu)
