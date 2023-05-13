import React from 'react'
import './panel.scss'
const Panel = (props) => {
  return (
    <div className="panel">
        <div className="desc">
        <h4>{props.item.name}</h4>
        <h4 className='status'>Status</h4>
        </div>
        <div className="about">
            <h5>Start date: {props.item.startDate}</h5>
            <h5>Manner:{props.item.type}</h5>
        </div>
    </div>
  )
}

export default Panel