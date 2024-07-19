import { useContext, useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";

//Components
import CardWrapper from "../mill-comps/components/CardWrapper";
import DrinksCard from "./DrinksCard";
import NotFound from "../utilities/NotFound";
import LoadingIcons from 'react-loading-icons'

//Icons
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

//Context
import { DrinksContext } from "../App";
import { ContentContext } from "../Content";

const DrinksView = ({drinkChunks}) =>{    
    const navigate = useNavigate();

    const {id} = useParams();

    //Memoized values
    const chunk = useMemo(() =>{
        if(!drinkChunks || !id) return;
        return drinkChunks[parseInt(id)];
    }, [drinkChunks, id]);

    //Context
    const {handleDecrementPage, handleIncrementPage} = useContext(ContentContext);

    return(
        <>
            {chunk &&<>
                <div className="drinksView flex flex-row justify-center flex-wrap">
                    {chunk?.map((drink) =>(
                        <DrinksCard key={`${drink.drink_name}|${drink.id}`} drink={drink}/>
                    ))}   
                </div>
                <div className="flex flex-row justify-center gap-2 mb-3">
                    <button className="page-nav-btn row-flex-center items-center text-2xl" onClick={() => handleDecrementPage(id)}><FaArrowLeft /></button>
                    <button className="page-nav-btn row-flex-center items-center text-2xl" onClick={() => handleIncrementPage(id)}><FaArrowRight /></button>
                </div>
            </>}
            {!chunk && <div className="size-full col-flex-center p-5">
                <LoadingIcons.SpinningCircles strokeOpacity={.125} speed={1.5}  className="size-1/4"/>
            </div>}
        </>   
    );
}

export default DrinksView;