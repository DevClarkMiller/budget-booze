import { useContext, useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";

//Components
import AsideMenu from '../AsideMenu'
import LoadingIcons from 'react-loading-icons'
import DrinksList from "./DrinksList";



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

    return(
        <div className="size-full col-flex-center gap-0">
            {chunk&&<div className="size-full row-flex-center">
                <AsideMenu className={`w-1/3`} />
                <DrinksList chunk={chunk} id={id} className={`w-2/3`} />
            </div>}
            
            {!chunk && <div className="size-full col-flex-center p-5">
                <LoadingIcons.SpinningCircles strokeOpacity={.125} speed={1.5}  className="size-1/4"/>
            </div>}
        </div>   
    );
}

export default DrinksView;