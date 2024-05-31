import { useParams } from "react-router-dom";
import { useEffect } from "react";
import CardWrapper from "./CardWrapper";

const DrinksCard = () =>{
    const id = useParams();



    return(
        <CardWrapper className="drinksCard">
            <div className="w-full h-full">
                <h2>{drink.title}</h2>
            </div>
        </CardWrapper>
    );
}

export default DrinksCard;