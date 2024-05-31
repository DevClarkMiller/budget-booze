import { useParams } from "react-router-dom";
import { useEffect, useContext } from "react";
import { DrinksContext } from "./App";
import CardWrapper from "./CardWrapper";

const DrinksCard = ({drink}) =>{
    const {drinksContent} = useContext(DrinksContext);

    /*
    useEffect(() =>{
        console.log(drink)
    }, [drink]);*/
    return(
        <>
            { drink &&
                <CardWrapper className="drinksCard">
                <div className="w-full h-full">
                    <h2>{drink.drink_name}|${drink.price}|{drink.alcohol_percent}%|</h2>
                </div>
                </CardWrapper>
            }
        </>
        
    );
}

export default DrinksCard;