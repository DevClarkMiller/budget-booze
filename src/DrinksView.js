import { useContext, useState, useEffect } from "react";
import DrinksCard from "./DrinksCard";

const DrinksView = ({drinksChunk}) =>{    

    useEffect(() =>{
        
    }, []);

    return(
        <div className="drinksView">
            {
                drinksChunk.map((drink) =>(
                    <DrinksCard key={`${drink.drink_name}|${drink.price}`}/>
                ))
            }
        </div>
    );
}

export default DrinksView;