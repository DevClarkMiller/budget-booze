import { useMemo } from "react";

//Components
import CardWrapper from "../mill-comps/components/CardWrapper";

const DrinksCard = ({drink, index, nav, className}) =>{
    //State

    //Memoized values
    const formattedPrice = useMemo(() => parseFloat(drink.price).toFixed(2), [drink]);
    const volumeDisplay = useMemo(() =>((drink.pieces_per > 1) ? `${drink.pieces_per} x ${drink.total_volume} ml` : `${drink.total_volume} ml`),[drink]);
    const logoColour = useMemo(() => (drink.store === "LCBO") ? "text-[#174634]" : "text-beerOrange", [drink]);
    
    return(
        <>
            {drink && <>
                <CardWrapper to={(!isNaN(index) && nav) ? `single/${index}` : null} className={`drinks-card-mobile ${className ? className : "drinks-card-responsive"} lg:flex shadow-md`}>
                    <div className={`flippable-card-front`}>
                        <div className="drink-header flex items-center gap-2 w-3/4">
                            <h3 className={`drink-store  ${logoColour}`}>{drink.store}</h3>
                            <h2 className="drink-name flex-grow text-one-line">{drink.drink_name}</h2>
                        </div>
                        <h4 className="drink-volume">{volumeDisplay}</h4>
                        <div className="drink-img-container flex-grow row-flex-center items-end">
                            <img className="object-contain" loading="eager" src={drink?.image_url} alt={`${drink.drink_name} preview`}></img>
                        </div>
                        
                        <span className="flex flex-row justify-between w-full">
                            <h2 className="drink-price">${formattedPrice}</h2>
                            <h2 className="drink-percent">{drink.alcohol_percent}%</h2>
                        </span>
                    </div>
                </CardWrapper>
            </>}   
        </>
    );
}

export default DrinksCard;