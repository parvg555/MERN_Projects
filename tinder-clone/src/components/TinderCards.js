import React from 'react'
import "./css/TinderCards.css";
import { useState,useEffect } from "react";
import TinderCard from 'react-tinder-card';
import axios from '../axios.js';

function TinderCards() {

    const [people, setPeople] = useState([]);

    useEffect (() => {
        async function fetchData(){
            const req = await axios.get('/tinder/cards');
            setPeople(req.data);
        }
        fetchData();
    },[])

    const swiped = (direction, nameToDelete) => {
        console.log("Removing: ",nameToDelete);
    };

    const outOfFrame = (name) => {
        console.log(name+" left the screen!");
    };

    return (
        <div className='tinderCards'>
            <div className="tinderCards__cardContainer">
                {people.map((character) => (
                    <TinderCard
                        className='swipe'
                        key={character.name}
                        preventSwipe={["up","down"]}
                        onSwipe={(dir) => swiped(dir,character.name)}
                        onCardLeftScreen={() => outOfFrame(character.name)} 
                    >
                        <div
                            style={{ backgroundImage: `url(${character.imgUrl})` }}
                            className='card'
                        >
                            <h3>{character.name}</h3>
                        </div>
                    </TinderCard>
                ))}
            </div>

        </div>
    )
}

export default TinderCards
