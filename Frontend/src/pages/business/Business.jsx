import React, { useState } from 'react'
import './business.scss'
import newRequest from "../../utils/newRequest";
const Business = () => {
    const [transcript, setTranscript] = useState('');
    const [org, setOrg] = useState('');
    const [budget, setBudget] = useState('')
    const [contact, setContact] = useState('');
    const sendProposal = async (e) => {
        e.preventDefault();
        try {
            await newRequest.post("/proposal/123", {
                text: transcript,
                org: org,
                budget: budget,
                contact: contact
            });
        } catch (err) {
            console.log(err);
        }
    }
    const handleListen = () => {
        const recognition = new window.webkitSpeechRecognition();
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setTranscript(transcript);
        };
        recognition.start();
    };
    return (
        <div className='business'>
            <div className="left">
                <img src="/img/brand.jpg" alt="" />
            </div>
            <div className="bcontainer">
                <h3>Find a brand deal</h3>
                <p>We'll break down the complexity of finding the conmplexity of brand integration with creators and help you narrow down options in few clicks</p>
                <div className="bbox">
                    <div className="info1">
                        <input placeholder='Your Organiation name' value={org} onChange={(e) => { setOrg(e.target.value) }} />
                        <input placeholder='Your budget for brand integration' value={budget} onChange={(e) => { setBudget(e.target.value) }} />
                    </div>
                    <textarea name="" id="" cols="20" rows="10" placeholder={transcript} value={transcript} onChange={(e) => { setTranscript(e.target.value) }}></textarea>
                    <img src="/img/chatbot.png" alt="" onClick={handleListen} />
                </div>
                <br />
                <div className="contact">
                    <h4>Best phone number to reach you</h4>
                    <input placeholder='8908990890' value={contact} onChange={(e) => { setContact(e.target.value) }} />

                </div>
                <div>
                </div>
                <button onClick={sendProposal}>Submit Request</button>
            </div>

        </div>
    )
}

export default Business