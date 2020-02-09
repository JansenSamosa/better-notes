import React, { Component } from 'react'

import Menu from './Menu'

import menuicon from '../../icons/menuicon.png'
import './navbar.css'

export class Navbar extends Component {
    state = {
        menuOpen: false
    }

    openMenu = () => {
        if(!this.state.menuOpen) this.setState({menuOpen: true})
        else this.setState({menuOpen: false})
    }
    render() {
        return (
            <div>
                <div className='nav-bar'>
                    <h1 className='nav-bar-title'>Better Notes</h1>
                    <Menu open={this.state.menuOpen}/>
                    <img 
                        className='nav-bar-menubutton' 
                        src={menuicon} 
                        alt=''
                        onClick={this.openMenu}
                    />
                </div>
                
            </div>
        )
    }
}

export default Navbar
