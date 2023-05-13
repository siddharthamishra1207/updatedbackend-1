import React, { useEffect } from 'react'
import './slide.scss'
import { useState } from 'react';
import ReactSimplyCarousel from 'react-simply-carousel';
import { cards } from '../../data';
import { CatCard } from '../CatCard/CatCard';
export const Slide = () => {
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);
    const [cData,setData]=useState(cards)
    console.log(cards)
    useEffect(()=>{
        fetch('http://34.131.221.158:8800/api/users/latest/5')
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
    
    return (
        <div className='slide'>
            <div className="container">
                {/* <Slider >
                    {cards.map(card => {
                        <CatCard item={card} key={card.id} />
                    })}
                </Slider> */}

                <ReactSimplyCarousel
                    activeSlideIndex={activeSlideIndex}
                    onRequestChange={setActiveSlideIndex}
                    itemsToShow={1}
                    itemsToScroll={1}
                    forwardBtnProps={{
                        //here you can also pass className, or any other button element attributes
                        style: {
                            alignSelf: 'center',
                            background: 'black',
                            border: 'none',
                            borderRadius: '50%',
                            color: 'white',
                            cursor: 'pointer',
                            fontSize: '20px',
                            height: 30,
                            lineHeight: 1,
                            textAlign: 'center',
                            width: 30,
                        },
                        children: <span>{`>`}</span>,
                    }}
                    backwardBtnProps={{
                        //here you can also pass className, or any other button element attributes
                        style: {
                            alignSelf: 'center',
                            background: 'black',
                            border: 'none',
                            borderRadius: '50%',
                            color: 'white',
                            cursor: 'pointer',
                            fontSize: '20px',
                            height: 30,
                            lineHeight: 1,
                            textAlign: 'center',
                            width: 30,
                        },
                        children: <span>{`<`}</span>,
                    }}
                    responsiveProps={[
                        {
                            itemsToShow: 4,
                            itemsToScroll: 2,
                            minWidth: 768,
                        },
                    ]}
                    speed={400}
                    easing="linear"
                >

                    {/* here you can also pass any other element attributes. Also, you can use your custom components as slides */}
                    {cData.map(card => (

                        <CatCard item={card} className="panel" />
                       
                    ))}

                </ReactSimplyCarousel>
            </div>
        </div>
    )
}

