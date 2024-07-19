import { useEffect, useState, useMemo } from "react";
import { isMobile } from "react-device-detect";

//Components
import CardWrapper from "../mill-comps/components/CardWrapper";

const DrinksCard = ({drink}) =>{
    const [flip, setFlip] = useState(false);
    const numStandards = useMemo(() =>((((drink.total_volume * drink.pieces_per) * drink.alcohol_percent) / 17.05) / 100).toFixed(1), [drink]);
    const formattedPrice = useMemo(() => parseFloat(drink.price).toFixed(2), [drink]);
    const volumeDisplay = useMemo(() =>((drink.pieces_per > 1) ? `${drink.pieces_per} x ${drink.total_volume} ml` : `${drink.total_volume} ml`),[drink]);
    const logoColour = useMemo(() => (drink.store === "LCBO") ? "text-[#174634]" : "text-beerOrange", [drink]);

    const FlipCardFront = () =>{
        return(
            <div className={`flippable-card-front ${flip&&'flip'}`}>
                <div className="drinkHeader flex items-center gap-2 w-3/4">
                    <h3 className={`${logoColour}`}>{drink.store}</h3>
                    <h2 className="flex-grow text-one-line">{drink.drink_name}</h2>
                </div>
                <img src={drink.image_url}></img>
                <span className="flex flex-row justify-between w-full"><h2>${formattedPrice}</h2><h2>{drink.alcohol_percent}%</h2> </span>
            </div>
        );
    }

    return(
        <>
            {drink && <>
                {/*Mobile View*/}
                <CardWrapper className='drinks-card-mobile lg:hidden' onMouseLeave={() => setFlip(false)} onMouseEnter={() => setFlip(true)}>
                    <FlipCardFront />
                    <div className={`flippable-card-back justify-evenly ${flip&& "opacity-100"}`}>
                        <h2>{volumeDisplay}</h2>
                        <h2># Standard Drinks: {numStandards}</h2>
                        <a className="drink-link" href={drink.link}>Take me to the drink</a> {/*Simulated Button*/}
                    </div>
                </CardWrapper>
                {/*Desktop View*/}
                <CardWrapper href={drink.link} className='drinks-card-mobile hidden lg:flex' onMouseLeave={() => setFlip(false)} onMouseEnter={() => setFlip(true)}>
                    <FlipCardFront />
                    <div className={`flippable-card-back justify-center ${flip&& "opacity-100"}`}>
                        <h2>{(drink.pieces_per > 1) ? `${drink.pieces_per} x ${drink.total_volume} ml` : `${drink.total_volume} ml`}</h2>
                        <h2># Standard Drinks: {numStandards}</h2>
                    </div>
                </CardWrapper>
            </>}   
        </>
    );
}

export default DrinksCard;