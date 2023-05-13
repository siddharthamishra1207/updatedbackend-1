import React from 'react'
import { Link } from 'react-router-dom'
import './feature.scss'
export const Featured = () => {
    return (
        <div className='featured'>
            <div className="landing">
            <div className="text">
            <h2>Transforming 21st century Creator Economy</h2>
            <h3>One stop for creators ,investors and MSME</h3>
         </div>
         <div className="img">
            <img src="/img/landingMock.png" alt="" />
         </div>
        </div>
        </div>
    )
}
