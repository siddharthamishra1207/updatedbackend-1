import React from 'react'
import { Link } from 'react-router-dom'
import queryString from 'query-string';
import './gigCard.scss'
export const GigCard = ({ item }) => {
    const queryParams = { id:item._id };
    const queryString2 = queryString.stringify(queryParams);
    return (

        <Link to={`/gig?${queryString2}`}>
            <div className='gigCard'>
                <img src={item.cover} alt="" />
                <div className="info">
                    <div className="user">
                        <img src={item.pp} alt="" />
                        <span>{item.username}</span>
                    </div>
                    <p>{item.desc}</p>
                    <div className="star">
                        <img src="./img/star/png" alt="" />
                        <span>{item.star}</span>
                    </div>
                </div>
                <hr />
                <div className="details">
                    <img src="/img/heart.png" alt="" />
                    <span>STARTING AT</span>
                    <h2>${item.price}</h2>
                </div>
            </div>
        </Link>
    )
}
