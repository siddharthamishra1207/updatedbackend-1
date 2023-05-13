import React, { useState, useEffect } from 'react'
import { Link, useAsyncError } from 'react-router-dom'
import { GigCard } from '../../components/GigCard/GigCard'
import { gigs } from '../../data'
import { useLocation } from "react-router-dom";
import './gigs.scss'
export const Gigs = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const cat= params.get("cat");
  console.log(cat)
  const [open, setOpen] = useState("")
  const [sort, setSort] = useState(false)
  const [max, setMax] = useState(10000);
  const [min, setMin] = useState(0);
  useEffect(()=>{
    fetch('http://34.131.221.158:8800/api/gigs/?cat='+cat)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setData(data)
        // logs the last 5 documents retrieved from the database
      })
      .catch(error => {
        console.error(error);
      });
  },[])
  const filter = () => {
    console.log(max)
    fetch('http://34.131.221.158:8800/api/gigs/?cat='+cat+'&max=' + max+'&min='+min)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setData(data)
        // logs the last 5 documents retrieved from the database
      })
      .catch(error => {
        console.error(error);
      });
  }
  console.log(max)
  const reSort = (type) => {
    setSort(type)
    setOpen(false)
  }
  const [cData, setData] = useState([])

  // useEffect(() => {
  //   fetch('http://localhost:8800/api/gigs/?cat=animation&max=' + max)
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log(data);
  //       setData(data)
  //       // logs the last 5 documents retrieved from the database
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // }, [])
  return (
    <div className='gigs'>
      <div className="container">
        
        <h1>Creators</h1>
        <p>Explore beCreator exclusive range of artists </p>
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input type="text" placeholder='min' value={min} onChange={(e)=>{setMin(e.target.value)}}/>
            <input type="text" placeholder='max' value={max} onChange={(e) => { setMax(e.target.value) }} />
            <button onClick={filter}>Apply</button>
          </div>
          {/* <div className="right">
            <span className="sortBy">Sort By</span>
            <span className="sortType">{sort === "revenue" ? "Revenue" : "Newest"}</span>
            <img src="./img/down.png" alt="" onClick={() => { setOpen(!open) }} />
            {open && <div className="rightMenu">
              {sort === "revenue" ?
                (<span onClick={() => { reSort("createdAt") }}>Newest</span>) :
                (<span onClick={() => { reSort("revenue") }}>Revenue</span>)}
            </div>}
          </div> */}


        </div>
        <div className="cards">  {cData.map(gig => (
          <GigCard key={gig.id} item={gig} />
        ))}
        </div>
      </div>
    </div>
  )
}
