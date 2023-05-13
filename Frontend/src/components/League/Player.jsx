import React from 'react'
import './player.scss'
import Detail from './Detail'
const Player = (props) => {
  console.log(props.player)
  return (
    <>
    <div className='player'>
        <img src={props.player.cover}></img>
        <h4>{props.player.name}</h4>
        <div className="btn">+</div>
    </div>
    </>
  )
}

export default Player