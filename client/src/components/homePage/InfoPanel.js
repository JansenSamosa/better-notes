import React, { Component } from 'react'

import './homePage.css'

export class InfoPanel extends Component {
    render() {
        return (
            <div className='home-info'>
                <h1>Welcome to Better Notes!</h1>
                <p>Hi! This is a versitile, but powerful note taking app is a tool will take 
                    your organization, planning, and productivity to the next level. When you take
                    advantage of its rich styling abilities, as well as the ability to use pictures and
                    photos, other note taking apps will seem anticlimactic. Better Notes is does
                    exactly what it says it does... It makes notes better.</p>
            </div>
        )
    }
}

export default InfoPanel
