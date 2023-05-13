import React, { useState, useEffect } from 'react'
import './brand.scss'
import { Link } from 'react-router-dom';
const Brand = () => {
    const [proposal, setProposal] = useState([]);
    const [start, setStart] = useState(false);

    const [user,setUser]=useState([]);
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("currentUser"))
        console.log(userData)
        setUser(userData)
      
        fetch('http://34.131.221.158:8800/api/proposal/')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setProposal(data)
                // logs the last 5 documents retrieved from the database
            })
            .catch(error => {
                console.error(error);

            });
    }, [])
    return (
        <>
        
        <div className='list'>
            {
                proposal.map(item => (
                    <div className='proposal'>
                        <h4>Org Name: {item.org}</h4>
                        <h4>Category:{item.category}</h4>
                        <h4> Budget:{item.budget}</h4>
                        <button ><Link to='/meet'>Start Chat</Link></button>
                    </div>
                ))
            }

        </div>
        </>
    )
}

export default Brand