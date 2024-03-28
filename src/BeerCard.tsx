import React, {useContext, useEffect, useState} from 'react';
import BeerContext from './BeerContext.tsx';
import noFavoriteImage from './images/no-favorite.png';
import favoriteImage from './images/favorite.png';
import downArrowImage from './images/down-arrow.png';
import upArrowImage from './images/up-arrow.png';

export function BeerCard({item, isPageFavorite}){
    const changeFavorite=useContext(BeerContext).changeFavorite;
    const fnIsFavorite= useContext(BeerContext).isFavorite;
    const [isDisplay,setIsDisplay]=useState(false);

    const [isFavorite,setIsFavorite]=useState(fnIsFavorite(item));

    //export to other file and import here
    const Favorite=()=>(
        <img className='favorite favorite-image' src={favoriteImage} onClick={ChangeFavoriteClickEvent}/>
    )
    const NoFavorite=()=>(
        <img className='no-favorite favorite-image' src={noFavoriteImage} onClick={ChangeFavoriteClickEvent}/>
    )

    const ChangeFavoriteClickEvent = (event) => {
        setIsFavorite(!isFavorite);
        changeFavorite(item);
    }

    const arrowClickEvent = (event) => {
        setIsDisplay(!isDisplay);
    }
    if((isFavorite && isPageFavorite)|| (!isPageFavorite)) {
        if(isDisplay) {
            return (
                <div className="beer-card-item" key={item.id}>
                    <div className='arrow' >
                    <img className="" src={upArrowImage} onClick={arrowClickEvent}/>
                </div>
                    <img className="icon" src={item.image_url}/>
                    {isFavorite ? Favorite() : NoFavorite()}
                    <h2>{item.first_brewed}</h2>
                    <p>{item.name}</p>
                    <p>{item.food_pairing}</p>
                    
                </div>
            )
        }
        else {
        return (
            <div className="beer-card-item close" key={item.id}>
            <div className='arrow' onClick={arrowClickEvent}>
                <img className="" src={downArrowImage} />
                <p>{item.name}</p>
                <img className="icon" src={item.image_url}/>
            </div>
        </div>
        )
        }
    }
}