import React from "react";
import SearchResult from "../SearchResult/SearchResult";
import '../SearchResultsList/SearchResultsList.css'

export default function SearchResultsList({searchResults, onClick}){
    if (searchResults){
        const searchResultsList = searchResults.map((result, i) => {
            return <SearchResult result={result} key={i} onClick={onClick}/>
        })
    
        return(
            <ul className="searchResults-ul">
                {searchResultsList}
            </ul>
        )
    }
}