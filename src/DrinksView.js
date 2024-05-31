import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { DrinksContext } from "./App";
import DrinksCard from "./DrinksCard";

const DrinksView = ({drinkChunks}) =>{    
    const [chunk, setChunk] = useState(null);

    const {id} = useParams();

    useEffect(() =>{
        if(drinkChunks){
            setChunk(drinkChunks[parseInt(id)]);
        }
        //console.log(drinkChunks[parseInt(id)]);
    }, [drinkChunks, id]);

    return(
        <div className="drinksView">
            {
                chunk && chunk.map((drink) =>(
                    <DrinksCard key={`${drink.drink_name}|${drink.id}`} drink={drink}/>
                ))
            }
        </div>
    );
}

export default DrinksView;