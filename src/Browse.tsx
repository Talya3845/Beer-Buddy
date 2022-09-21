import React from 'react';
import { BeerProvider } from './BeerContext.tsx'
import BeerList from './BeerList.tsx';
import { useState, useEffect } from 'react';
import {useLocation} from "react-router-dom";

import ReactPaginate from 'react-paginate';

const listFavorite = [];


export default function Browse(){
    const providerOptions = {
        data: listFavorite,
        changeFavorite: (value :number) => {
            const favoriteItemIndex = listFavorite.findIndex(item => item.id === value.id);
            if(favoriteItemIndex > -1){
                listFavorite.splice(favoriteItemIndex, 1);
            }
            else {
                listFavorite.push(value);
            }
        },
        isFavorite: (value :number) => listFavorite.findIndex(item => item.id === value.id) > -1? true : false,
        };

    const [data,setData]=useState(null);
    const [searchQuery, setQuery] = useState("");

    const [numPage,setNumPage]=useState(1);
    const pageCount =5;
    const perPage =12;

    const handlePageClick= (event) => {
        setNumPage(event.selected+1);
    }

    const inputEvent = (event) => {
        const data = event.target.value;
        setQuery(data);
    }

    useEffect(()=>{
        if(searchQuery)
        fetch(
            'https://api.punkapi.com/v2/beers/?food='+searchQuery +'&page='+numPage+'&per_page=' + perPage,{method: "GET",}
        ).then((response)=>response.json())
        .then(setData);
        else
        fetch(
            'https://api.punkapi.com/v2/beers/?page='+numPage+'&per_page=' + perPage ,{method: "GET",}
        ).then((response)=>response.json())
        .then(setData);

    },[numPage,searchQuery]);
    if(useLocation().pathname.endsWith('favorite')){
        console.log(providerOptions.data);
        return (
            <BeerProvider value={providerOptions}>
                <div className="container-list-beers">
                    <BeerList data={providerOptions.data} isPageFavorite={true} />
                </div>
            </BeerProvider>
        )
    }
    else {
        if(data) {
            const item=JSON.stringify(data);
            let listData=JSON.parse(item);
            return (
                <BeerProvider value={providerOptions}>
                    <div>
                        <form>
                            <label>Food Pairing</label>
                        <input type="text" onChange={ inputEvent }/>
                        </form>
                        <div className="container-list-beers">
                            <BeerList data={listData} isPageFavorite={false}/>
                            <ReactPaginate 
                            previousLabel="<<"
                            nextLabel=">"
                            onPageChange={handlePageClick}
                            pageCount={pageCount}
                            containerClassName={"pagination"}
                            previousLinkClassName={"pagination__link"}
                            nextLinkClassName={"pagination__link"}
                            disabledLinkClassName={"pagination__link--disabled"}
                            activeLinkClassName={"pagination__link--active"}
                            />
                        </div>
                    </div>
                </BeerProvider>
            );
        }
    }
}