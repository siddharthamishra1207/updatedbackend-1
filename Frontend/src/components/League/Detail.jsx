import React from 'react'
import './detail.scss'
const Detail = (props) => {
    return (
        <div>
            <div className="top">
                <div className="initial">
                    <h3>{props.name}</h3>
                    <h4>Your Leader: 
                     <select>
                        <option value="Member 1">Member 1</option>
                        <option value="Member 1">Member 1</option>
                    </select></h4>
                </div>
                <div className="info">
                    <div className="points">
                        <h5>Total Points</h5>
                        <h4>--</h4>
                    </div>
                    <div className="rank">
                        <h5>Overall Rank</h5>
                        <h4>--/{props.limit}</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detail