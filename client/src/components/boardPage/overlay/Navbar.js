import React, { Component } from 'react'
import {connect} from 'react-redux'

import Menu from './menu/Menu'

import menuicon from '../../../icons/menuicon.png'
import './navbar.css'

export class Navbar extends Component {
    state = {
        menuOpen: false
    }

    openMenu = () => {
        if(!this.state.menuOpen) this.setState({menuOpen: true})
        else this.setState({menuOpen: false})
    }
    getBoardName = () => {
        if(this.props.boards.board.name === null) return 'Better Notes'
        else return this.props.boards.board.name
    }
    render() {
        return (
            <div>
                <div className='nav-bar'>
                    <h1 className='nav-bar-title'>{this.getBoardName()}</h1>
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

const mapStateToProps = state => ({
    boards: state.boards
})
export default connect(mapStateToProps, {})(Navbar)
