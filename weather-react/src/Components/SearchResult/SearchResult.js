import React from "react";
import '../SearchResult/SearchResult.css'

export default function SearchResult({result,onClick}){
    return(
        <li className="result-li">
            <button type='button' onClick={()=> onClick(result)}>
                <section>{result.name} <br></br> {result.state}</section>
                {/* <section>({result.lat} <br></br>{result.lon})</section> */}
            </button>
        </li>
    )
}