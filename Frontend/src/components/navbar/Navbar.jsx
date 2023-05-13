import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import './navbar.scss'
import newRequest from '../../utils/newRequest'
export const Navbar = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  }
  
  useEffect(() => {
    window.addEventListener("scroll", isActive)
    return () => {
      window.removeEventListener("scroll", isActive)
      const currentUser = JSON.parse(localStorage.getItem("currentUser"))
      console.log(currentUser)
      // id=currentUser._id 

      
      // fetch('http://localhost:8800/api/users/'+id, {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      // })
      // .then(response => response.json())
      // .then(data => {
      //     console.log(data);
      //     localStorage.getItem("currentUser",data)
      //  // logs the last 5 documents retrieved from the database
      // })
      // .catch(error => {
      //     console.error(error);
      // });
    }

  }, [])
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout")
      localStorage.setItem("currentUser", null)
      navigate("/")
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link to="/" className='link'>
            <span className='text'>beCreator</span>
            <span className='dot'>.</span>
          </Link>
        </div>
        <div className="links">
          <span><Link to='/business' className='link'>Business</Link></span>
          <span><Link to='/league' className='link'>League</Link></span>
          <span>English</span>
          <span><Link to='/login' className='opt'>Sign In</Link></span>
          {!currentUser?.isCreator && <span><Link to='/signup' className='link'>Become a Creator</Link></span>}
          {!currentUser && <button>Join</button>}
          {
            currentUser && (
              <div className='user' onClick={() => setOpen(!open)}>
                <img src={currentUser.cover || "/img/noavatar.jpg"} alt="" />
                <span>{currentUser?.username}</span>
                {open && <div className="options">
                  {!currentUser?.isCreator ? (
                    <>
                      <Link to="/mygigs" className='link'>Gigs</Link>
                      <Link to="/add" className='link'>Add new Fund Campaign</Link>
                      <Link to="/dashboard" className='link'>Dashboard</Link>
                    </>
                  ) : <Link to='/dashboard' className='link'>Dashboard</Link>}
                  <Link to="/league" className='link'>League</Link>
                  <Link to="/business" className='link'>Business</Link>
                  <Link to="/" className='link' onClick={handleLogout}>Logout</Link>
                </div>}
              </div>
            )
          }
        </div>

      </div>

    </div>
  )
}
