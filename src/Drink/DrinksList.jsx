import { useContext, useMemo } from "react";

//Components
import DrinksCard from "./DrinksCard";

//Icons
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

//Context
import { ContentContext } from "../Content";

const DrinksList = (props) =>{
    //Context
    const {handleDecrementPage, handleIncrementPage} = useContext(ContentContext);

    const pageDetails = useMemo(() =>({
        hasNextPage: (props?.id + 1 < props.chunkCount),
        hasPrevPage: (props?.id - 1 > 0)
    }), [props?.id, props?.chunkCount]);

    return(
        <div className={`${props.className}`}>
            <div className={`drinksView row-flex-center flex-wrap gap-2 mb-2`}>
                {props.chunk?.map((drink) =>(
                    <DrinksCard key={`${drink.drink_name}|${drink.id}`} drink={drink}/>
                ))}   
            </div>

            <div className="flex flex-row justify-center gap-2 mb-3">
                <button disabled={!pageDetails?.hasPrevPage} className={`page-nav-btn row-flex-center items-center text-2xl`} onClick={() => handleDecrementPage(props.id)}><FaArrowLeft /></button>
                <button className="page-nav-btn row-flex-center items-center text-2xl" onClick={() => handleIncrementPage(props.id)}><FaArrowRight /></button>
            </div>
        </div>
    );
}

export default DrinksList;