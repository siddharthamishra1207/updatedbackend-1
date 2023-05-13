import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import './catCard.scss'
import queryString from 'query-string';
import { Link } from 'react-router-dom'
export const CatCard = ({ item }) => {
  const queryParams = { id:item._id };
    const queryString2 = queryString.stringify(queryParams);
  return (
    <Link to={`/gig?${queryString2}`}  className='link'>
      <div className='catCard'>
        <img src={item.cover} alt="" />
        <div className="text">
         <h4 className='title'>{item.title}</h4>
         <h4>AVG Monthly Revenue:{item.revenue}</h4>
         <h4>Max Investors:{item.max}</h4>
        </div>
      </div>

    </Link>
  )
}
