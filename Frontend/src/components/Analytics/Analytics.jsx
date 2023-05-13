import React, { useState, useEffect } from 'react';
import './analytics.scss';
import Invest from './Invest';

const Analytics = () => {
  const [investors, setInvestors] = useState([])
  const [user, setUser] = useState('mohan');
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("currentUser"))
    console.log(userData.username)
    setUser(userData.username)
   
    fetch('http://34.131.221.158:8800/api/gigs/mygigs?username='+user)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setInvestors(data)
        // logs the last 5 documents retrieved from the database
      })
      .catch(error => {
        console.error(error);
      });
  }, [])
  return (
    <div className="leagues">
      <h3 className='h'>Leagues created by You</h3>
      <div className="list">
      {
        investors.map((item) => (
         <Invest data={item}/> 
        )
        )
      }
      </div>
    </div>
  );
};

export default Analytics;
