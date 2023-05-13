import React from 'react';
import { FaHome, FaChartLine, FaCalendarAlt, FaCog } from 'react-icons/fa';
import { Navbar } from '../navbar/Navbar';
import './dashboard.css';
import Pfm from '../Pfm/Pfm'
import Credit from '../CreditCard/Credit';
import Analytics from '../Analytics/Analytics';
import { useEffect } from 'react';
import { useState } from 'react';
import Brand from '../Brand/Brand';
import Register from '../../pages/register/Register';

const Dashboard = (props) => {
    const [info,setInfo]=useState([]);
    const [subscribers,setSubscribers]=useState(0);
    const [views,setViews]=useState(0);
    const [revenue,setRevenue]=useState(1000);
    const apiKey = 'AIzaSyCA1TMCgzzGYcNwEOGmQJ9C-R-DJvalCAY';
    
    // Specify the username of the channel you want to retrieve data for
    const channelid = 'UC6QEol2rdaqKce4VcTZ2JEg';
    useEffect(() => {
        // Make a request to the YouTube API to retrieve the channel data for the specified username
        fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelid}&key=${apiKey}`, {
            method: 'GET'
        }).then(response => response.json())
            .then(data => {
                console.log(data);
                setInfo(data.items[0])
                setSubscribers(data.items[0].statistics.subscriberCount)
                setViews(data.items[0].statistics.viewCount)
            })
            .catch(error => {
                console.error(error);
            });

            
    }, [])
    const [activeTab, setActiveTab] = React.useState('home');
    console.log(props.auth)
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    

    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const [settings, setSettings] = React.useState({
        notifications: true,
        newsletter: true,
        marketing: false,
    });

    const handleSettingsChange = (event) => {
        const { name, checked } = event.target;
        setSettings((prevSettings) => ({
            ...prevSettings,
            [name]: checked,
        }));
    };

    return (
        <div className="dashboard">
            <Navbar/>
            <div className="tabs">
                <div
                    className={`tab ${activeTab === 'home' ? 'active' : ''}`}
                    onClick={() => handleTabClick('home')}
                >
                    <FaHome />
                    <span>Dashboard</span>
                </div>
                <div
                    className={`tab ${activeTab === 'analytics' ? 'active' : ''}`}
                    onClick={() => handleTabClick('analytics')}
                >
                    <FaChartLine />
                    <span>Analytics</span>
                </div>
                {/* <div
                    className={`tab ${activeTab === 'pfm' ? 'active' : ''}`}
                    onClick={() => handleTabClick('pfm')}
                >
                    <FaChartLine />
                    <span>PFM</span>
                </div>
                <div
                    className={`tab ${activeTab === 'card' ? 'active' : ''}`}
                    onClick={() => handleTabClick('card')}
                >
                    <FaChartLine />
                    <span>Credit Card</span>
                </div> */}
                <div
                    className={`tab ${activeTab === 'brand' ? 'active' : ''}`}
                    onClick={() => handleTabClick('brand')}
                >
                    <FaCalendarAlt />
                    <span>Brand Deals</span>
                </div>
                <div
                    className={`tab ${activeTab === 'settings' ? 'active' : ''}`}
                    onClick={() => handleTabClick('settings')}
                >
                    <FaCog />
                    <span>Settings</span>
                </div>
            </div>
            <div className="content">
                {activeTab === 'home' && (
                    <div className="home-tab">
                        <h2>Welcome to your Creator Dashboard!</h2>
                        <p>Here you can see an overview of your subscription-based business.</p>
                        <div className="stats-container">
                            <div className="stat">
                                <h3>Subscribers</h3>
                                <span className="stat-value">{subscribers}</span>
                            </div>
                            <div className="stat">
                                <h3>Views</h3>
                                <span className="stat-value">{views}</span>
                            </div>
                            <div className="stat">
                                <h3>Monthly Revenue</h3>
                                <span className="stat-value">{revenue}</span>
                            </div>
                        </div>
                        <div className="chart-container">
                            <h3>Monthly Revenue</h3>
                            <img src="/revenue-chart.png" alt="Monthly Revenue Chart" />
                        </div>
                    </div>
                )}
                {activeTab === 'pfm' && (
                    <Pfm />
                )}
                {activeTab === 'card' && (
                    <Credit />
                )}
                {activeTab === 'analytics' && (
                    <div className="analytics-tab">
                        <Analytics />
                    </div>
                )}
                {activeTab === 'brand' && (
                    <div className="schedule-tab">
                        <Brand/>
                    </div>
                )}
                {activeTab === 'settings' && (
                    <Register/>
                )}
            </div>
        </div>
    );
};

export default Dashboard;