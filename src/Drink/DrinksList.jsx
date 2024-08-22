import { useContext, useEffect, useMemo, useRef, useLayoutEffect } from "react";

//Components
import DrinksCard from "./DrinksCard";

//Functions
import scrollTo from '../functions/scrollTo';

//Icons
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

//Context
import { ContentContext } from "../Content";

const DrinksList = (props) =>{
    //Context
    const {handleDecrementPage, handleIncrementPage} = useContext(ContentContext);

    //Refs
    const btnsRef = useRef();

    const pageDetails = useMemo(() =>({
        hasNextPage: (props?.id + 1 < props.chunkCount),
        hasPrevPage: (props?.id - 1 >= 0)
    }), [props?.id, props?.chunkCount]);

    //Scrolls a user to the buttons element if the page loads and they're scrolled over halfway in the page
    useLayoutEffect(() =>{
        setTimeout(() =>{
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const scroll = document.documentElement.scrollTop;
            if (scroll > maxScroll / 3){
                scrollTo(btnsRef);
            }
        }, 150);
    }, []);

    return(
        <div className={`${props.className}`}>
            <div className={`drinksView row-flex-center flex-wrap gap-2 mb-2`}>
                {props.chunk?.map((drink, index) =>(
                    <DrinksCard key={`${drink.drink_name}|${drink.id}`} nav index={index} drink={drink}/>
                ))}   
            </div>

            <div ref={btnsRef} className="flex flex-row justify-center gap-2 mb-3">
                <button disabled={!pageDetails?.hasPrevPage} className={`${pageDetails.hasPrevPage ? "page-nav-btn" : "disabled-nav-btn"} row-flex-center items-center text-2xl`} onClick={() => handleDecrementPage(props.id)}><FaArrowLeft /></button>
                <button disabled={!pageDetails?.hasNextPage} className={`${pageDetails.hasNextPage ? "page-nav-btn" : "disabled-nav-btn"} row-flex-center items-center text-2xl`} onClick={() => handleIncrementPage(props.id)}><FaArrowRight /></button>
            </div>
        </div>
    );
}

export default DrinksList;