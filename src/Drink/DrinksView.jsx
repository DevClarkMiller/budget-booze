import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

//Components
import AsideMenu from '../AsideMenu'
import LoadingIcons from 'react-loading-icons'
import DrinksList from "./DrinksList";

//Context
// import { DrinksContext } from "../App";
// import { ContentContext } from "../Content";

const DrinksView = ({drinkChunks, chunkCount}) =>{    

    const {id} = useParams();

    const parsedID = useMemo(() => parseInt(id), [id]);

    //Memoized values
    const chunk = useMemo(() =>{
        if(!drinkChunks || isNaN(parsedID)) return;
        return drinkChunks[parsedID];
    }, [drinkChunks, parsedID]);

    return(
        <div className="size-full col-flex-center gap-0">  
            <div className="size-full row-flex-center min-h-screen">
                <AsideMenu className={`w-1/4 hidden lg:flex`} />

                {chunk ? 
                    <DrinksList chunk={chunk} id={parsedID} className={`w-full lg:w-3/4`} chunkCount={chunkCount} />
                    :
                    <div className="size-full col-flex-center p-5">
                        <LoadingIcons.SpinningCircles strokeOpacity={.125} speed={1.5}  className="size-1/4"/>
                    </div>
                }
            </div> 
        </div>   
    );
}

export default DrinksView;