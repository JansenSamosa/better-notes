import React, { Component } from 'react'

import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getBoard, getAllBoards, createBoard, deleteBoard } from '../../actions/boardActions'

import HomeBtn from '../nav/homeBtn'

import newBoardIcon from '../../icons/newboardicon.png'
import delBoardIcon from '../../icons/deleteboardicon.png'
import './boardsPage.css'
import './boardsPageMobile.css'

export class BoardsPage extends Component {
    state = {
        newBoardName: null,
        redirect: false,
        redirectTo: null
    }
    componentDidMount() {
        this.props.getAllBoards()
    }
    componentDidUpdate() {
        this.props.getAllBoards()
    }
    newBoard = () => {
        this.props.createBoard(this.state.newBoardName)
    }
    delBoard = id => {
        this.props.deleteBoard(id)
    }
    renderBoards = () => {
        return (
            <div>
                <HomeBtn />
                {this.props.boards.map(board => (
                    <div 
                        className='boards-board' 
                        key={board.id}
                        
                    >
                            <p onClick={() => {this.setState({redirect:true, redirectTo:`/boards/${board.id}`})}}>{board.name}</p>
                            <img src={delBoardIcon} alt='' onClick={this.delBoard.bind(this, board.id)}/>
                    </div>
                ))}
                <div className='board-newboard'>
                    <input type='text' placeholder='New board name here' onChange={e => this.setState({...this.state, newBoardName:e.target.value})}/>
                    <img src={newBoardIcon} alt='' onClick={this.newBoard}/>
                </div>
            </div>
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
            <div className='boards'>
                <h1>Your Boards</h1>
                {this.renderBoards()}

                {this.redirects()}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    boards: state.boards.boards
})

export default connect(mapStateToProps, {getBoard, getAllBoards, createBoard, deleteBoard})(BoardsPage)
