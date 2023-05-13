import React from 'react'
import { Link } from 'react-router-dom'
import './explore.scss'
export const Explore = () => {
    return (
        <div className='explore'>
            <h2>Explore categories</h2>
            <div className="content">
                <div className="img">
                    <img src="/img/category.jpg" alt="" />
                </div>
                <div className="text">
                    <div className="option">
                        <div className="first">
                            <Link to='/gigs?cat=design' className='link'>
                                <div className="div">
                                    <img src="/img/f1.png" alt="" />
                                    <h3> Design </h3>
                                </div>
                            </Link>
                            <Link to='/gigs?cat=music' className='link'>
                                <div className="div" className-='music'><img src="/img/f4.png" alt="" />
                                    <h3> Music </h3>
                                </div>
                            </Link>
                        </div>
                        <div className="second">
                            <Link to='/gigs?cat=health' className='link'>
                                <div className="div"><img src="/img/health.jpg" alt="" />
                                    <h3>Health </h3></div>
                            </Link>
                            <Link to='/gigs?cat=tech' className='link'>
                                <div className="div"> <img src="/img/chatbot.png" alt="" />
                                    <h3>Tech </h3></div>
                            </Link>
                        </div>






                    </div>
                </div>
            </div>
        </div>
    )
}
