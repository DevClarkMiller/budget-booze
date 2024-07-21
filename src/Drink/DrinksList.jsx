import { useContext } from "react";

//Components
import DrinksCard from "./DrinksCard";

//Icons
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

//Context
import { ContentContext } from "../Content";

const DrinksList = (props) =>{
    //Context
    const {handleDecrementPage, handleIncrementPage} = useContext(ContentContext);

    return(
        <div className={`${props.className}`}>
            <div className={`drinksView row-flex-center flex-wrap`}>
            {props.chunk?.map((drink) =>(
                <DrinksCard key={`${drink.drink_name}|${drink.id}`} drink={drink}/>
            ))}   
            </div>

            <div className="flex flex-row justify-center gap-2 mb-3">
                <button className="page-nav-btn row-flex-center items-center text-2xl" onClick={() => handleDecrementPage(props.id)}><FaArrowLeft /></button>
                <button className="page-nav-btn row-flex-center items-center text-2xl" onClick={() => handleIncrementPage(props.id)}><FaArrowRight /></button>
            </div>
        </div>
    );
}

export default DrinksList;