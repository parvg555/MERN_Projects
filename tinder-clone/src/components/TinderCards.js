import React from 'react'
import "./css/TinderCards.css";
import { useState } from "react";
import TinderCard from 'react-tinder-card';


function TinderCards() {

    const [people, setPeople] = useState([
        {
            name: 'Elon Musk',
            url: 'https://upload.wikimedia.org/wikipedia/commons/8/85/Elon_Musk_Royal_Society_%28crop1%29.jpg',
        },
        {
            name: "Jeff Bezos",
            url: "https://cdn.britannica.com/56/199056-050-CCC44482/Jeff-Bezos-2017.jpg",
        }
    ]);

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
                            style={{ backgroundImage: `url(${character.url})` }}
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
