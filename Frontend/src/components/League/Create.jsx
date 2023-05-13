import React, { useState, useEffect } from 'react'
import { Navbar } from '../navbar/Navbar'
import './create.scss'
import { CatCard } from '../CatCard/CatCard'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import newRequest from "../../utils/newRequest";

const Create = () => {
  const [cData, setData] = useState([])
  const [cat, setCat] = useState('music');
  const [team, setTeam] = useState([])
  const [open, setOpen] = useState(false);
  const [size,setSize]=useState(0);
  const[name,setName]=useState('');
  const[type,setType]=useState('');
  const[maxPlayer,setMax]=useState(0);
  const[startDate,setStart]=useState('');
  const[endDate,setEnd]=useState('');

  const createLeague=async(e)=>{
    const [user,setUser]=useState('')
    e.preventDefault();
    try {
        await newRequest.post("/league/create", {
            userId:user,
            name:name,
            type:type,
            maxPlayer:maxPlayer,
            startDate:startDate,
            endDate:endDate,
            creators:team
        });
      } catch (err) {
        console.log(err);
      }
  }

  const onOpenModal = () => {
    setOpen(true)
    document.body.classList.add('modal-open');
  };
  const onCloseModal = () => {
    setOpen(false);
    document.body.classList.remove('modal-open');
  }
  const getCreators = () => {
    fetch('http://34.131.221.158:8800/api/gigs?cat=' + cat)
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
  useEffect(() => {
    getCreators();
    console.log(team)
    let currentUser=JSON.parse(localStorage.getItem('currentUser'))
    setUser(currentUser.username)
    
  }, [])
  return (
    <div className='create'>
      <div className="search">
        <input type="text" placeholder='Search for a category to create league' value={cat} onChange={(e) => { setCat(e.target.value) }} />
        <button onClick={getCreators}>Search Now</button>
      </div>
      <div className="creators">
        {cData.map(card => (
        
            <div className='card'>
            <CatCard item={card} />
            <button className='add' onClick={() => { setTeam([...team,{userId:card.username,cover:card.cover}]); console.log(team);setSize(size+1) }}>Add to league </button>
            </div>
  
        ))}
      </div>
      <button className='panelBtn' onClick={onOpenModal}>Start League Now</button>
      <Modal open={open} onClose={onCloseModal} center >
        <div className="model">
          <div className="modelhead">
            <h4 >Create a new League</h4>
          </div>
          <h4>Fill the fields below to create your new league</h4>
          <div className="info">
          <input placeholder='League Name' value={name} onChange={(e)=>{setName(e.target.value)}}></input>
          <input placeholder='League Type' value={type} onChange={(e)=>{setType(e.target.value)}}></input>
          <input placeholder='Max Players' value={maxPlayer} onChange={(e)=>{setMax(e.target.value)}}></input>
          </div>
          <h5>Total Slot size: {size}</h5>
          <div className='timeInfo'>
            <label for='start'>League start date</label>
            <input type='date' id='start' value={startDate} onChange={(e)=>{setStart(e.target.value)}}></input>
          <br></br>
            <label for='end'>League end date</label>
            <input type='date' id='end' value={endDate} onChange={(e)=>{setEnd(e.target.val)}}></input>
          </div>
          <button onClick={createLeague}>Create</button>
        </div>
      </Modal>
    </div>
  )
}

export default Create