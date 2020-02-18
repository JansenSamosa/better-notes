import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getBoard } from '../../../../actions/boardActions'
import './menu.css'

export class MenuBoards extends Component {
    state = {
        redirect: false,
        redirectTo: null
    }

    renderBoards = () => {
        return (
            this.props.boards.map(board => (
                <div 
                    className='nav-menu-boards-board' 
                    key={board.id}
                    onClick={() => {this.setState({redirect:true, redirectTo:`/boards/${board.id}`})}}
                >
                        <p>{board.name}</p>
                </div>
            ))
        )
    }

    redirects = () => {
        if(this.state.redirect) {
            this.setState({redirect: false, redirectTo: null})
            return <Redirect to={this.state.redirectTo}/>
        }
    }
    render() {
        return (
            <div className='nav-menu-boards'>
                <h1>Boards</h1>
                {this.renderBoards()}

                {this.redirects()}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    boards: state.boards.boards
})

export default connect(mapStateToProps, {getBoard})(MenuBoards)
