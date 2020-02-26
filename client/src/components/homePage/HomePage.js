import React, { Component } from 'react'

import InfoPanel from './InfoPanel'
import HomeNavBtns from './HomeNavBtns'

import './homePage.css'
import './homePageMobile.css'

export class HomePage extends Component {
    render() {
        return (
            <div className='home-container'>
                <InfoPanel />
                <HomeNavBtns />
            </div>
        )
    }
}

export default HomePage
