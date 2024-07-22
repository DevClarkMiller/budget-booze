import { useEffect, useState, useMemo } from "react";

//Components
import CardWrapper from "../mill-comps/components/CardWrapper";

const DrinksCard = ({drink}) =>{
    const formattedPrice = useMemo(() => parseFloat(drink.price).toFixed(2), [drink]);
    const volumeDisplay = useMemo(() =>((drink.pieces_per > 1) ? `${drink.pieces_per} x ${drink.total_volume} ml` : `${drink.total_volume} ml`),[drink]);
    const logoColour = useMemo(() => (drink.store === "LCBO") ? "text-[#174634]" : "text-beerOrange", [drink]);

    return(
        <>
            {drink && <>
                <CardWrapper href={drink.link} className='drinks-card-mobile lg:flex shadow-md'>
                    <div className={`flippable-card-front`}>
                        <div className="drinkHeader flex items-center gap-2 w-3/4">
                            <h3 className={`${logoColour}`}>{drink.store}</h3>
                            <h2 className="flex-grow text-one-line">{drink.drink_name}</h2>
                        </div>
                        <h2>{volumeDisplay}</h2>
                        <img loading="lazy" src={drink.image_url} alt={`${drink.drink_name} preview`}></img>
                        <span className="flex flex-row justify-between w-full"><h2>${formattedPrice}</h2><h2>{drink.alcohol_percent}%</h2> </span>
                    </div>
                </CardWrapper>
            </>}   
        </>
    );
}

export default DrinksCard;