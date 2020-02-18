import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import './homeBtn.css'
import homeIcon from '../../icons/homeicon.png'

export class homeBtn extends Component {
    state = {
        redirect: false,
        redirectTo: null
    }
    redirects = () => {
        if(this.state.redirect) {
            const temp = this.state.redirectTo
            this.setState({redirect: false, redirectTo:null})
            return <Redirect to={temp} />
        }
    }
    render() {
        return (
            <div>
                <img 
                    src={homeIcon} 
                    alt='' 
                    className='uni-nav-homebtn'
                    onClick={() => this.setState({redirect: true, redirectTo:''})}
                />                
                {this.redirects()}
            </div>
        )
    }
}

export default homeBtn
