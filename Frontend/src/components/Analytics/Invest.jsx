import React from 'react'
import './invest.scss'

const Invest = (props) => {
    return (


        <div className="box">
            <h3>{props.data.title}</h3>
            <div className="items">
                <div className="item">
                    <span className="title">Max Investors</span>
                    <span className="desc">{props.data.max}</span>
                </div>
                <div className="item">
                    <span className="title">Vesting Time</span>
                    <span className="desc">{props.data.vestingTime}</span>
                </div>
                <div className="item">
                    <span className="title">Avg. Monthly Revenue</span>
                    <span className="desc">{props.data.revenue}</span>
                </div>
                {/* <div className="item">
                  <span className="title"></span>
                  <span className="desc">1 day</span>
                </div> */}
                <div className="item">
                    <span className="title">Languages</span>
                    <span className="desc">English</span>
                </div>

            </div>
            <hr />
            <h4>Current Investors</h4>
            {
                props.data.investors.map((item) => (
                    <div className="item">
                    
                    <span className="desc">{item}</span>
                </div>
                )
                )
            }
            <p>

            </p>
        </div>
    )
}

export default Invest