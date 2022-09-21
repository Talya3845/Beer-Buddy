import React, {useContext} from 'react';
import { BeerProvider } from './BeerContext.tsx';
import BeerContext from './BeerContext.tsx';


import { BeerCard } from './BeerCard.tsx';
import {useLocation} from "react-router-dom";

export default function BeerList({data, isPageFavorite}){
    const providerOptions=useContext(BeerContext);
    // if(useLocation().pathname.endsWith('favorite')){

    return(
        <BeerProvider value={providerOptions}>
               <div className="list-beer">
                {data.map(item => (item.id ? <BeerCard item={item} key={item.id} isPageFavorite={isPageFavorite}/>: ''))}
                </div>
        </BeerProvider>
    );
    // }
}


