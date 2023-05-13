import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Detail from '../../components/League/Detail'
import Panel from '../../components/League/Panel'
import Player from '../../components/League/Player'
import { Navbar } from '../../components/navbar/Navbar'
import './league.scss'
const League = () => {
    const [leagueData, setData] = useState([]);
    const [leagueCreators, setCreators] = useState([]);
    const [league,setLeague]=useState('League Name');
    const [max,setMax]=useState(0);
    useEffect(() => {
        fetch('http://34.131.221.158:8800/api/league/leagues')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setData(data)
                // logs the last 5 documents retrieved from the database
            })
            .catch(error => {
                console.error(error);
            });
    }, [])
    return (
        <div>
            <Navbar />
            <div className="nav">
                <ul>
                    <li><Link to='/create'>TEAM</Link></li>
                    <li>LEAGUE</li>
                    <li>RANKINGS</li>
                </ul>
            </div>
            <div className="schedule">
                <h3>Upcoming leagues</h3>
                <div className="panels">

                    {leagueData.map(details => (
                        <div onClick={()=>{setCreators(details.creators);setLeague(details.name),setMax(details.maxPlayer)}} style={{padding:"5px"}}>
                        <Panel item={details}  />
                        </div>
                    ))}
                </div>
            </div>
            <hr></hr>
            <div className="leagueDetails">
                <Detail name={league} limit={max} />
            </div>
            <div className="listP">
                {leagueCreators.map(player=> (

                    <Player player={player} />

                ))}
            </div>
        </div>
    )
}

export default League