import { useState, useEffect, useContext, useCallback, useMemo, createContext } from "react";
import { Routes, Route, useNavigate, Link} from "react-router-dom";

//Components
import CardWrapper from "./mill-comps/components/CardWrapper";
import DrinksView from "./Drink/DrinksView";
import NotFound from "./utilities/NotFound";
import NoDrinksLoaded from "./utilities/NoDrinksLoaded";
import LandingPage from "./LandingPage";

//Context
import { DrinksContext } from "./App";
export const ContentContext = createContext();

const Content = () =>{
    const CHUNK_SIZE = 35;
    const navigate = useNavigate();
    const { drinksContent } = useContext(DrinksContext);

    const drinkChunks = useMemo(() =>{
        if(!drinksContent) return;
        return Array.from({ length: Math.ceil(drinksContent.length / CHUNK_SIZE) }, (_, i) =>
            drinksContent.slice(i * CHUNK_SIZE, i * CHUNK_SIZE + CHUNK_SIZE));
      }, [drinksContent]);


    const handleIncrementPage = (id) =>{
        if(id + 1 < drinkChunks.length){
            navigate(`/drinks/${id + 1}`);
        }
    }

    const handleDecrementPage = (id) =>{
        if(id - 1 >= 0){
            navigate(`/drinks/${id - 1}`);
        }
    }

    return(
        <main className="size-full col-flex-center justify-center flex-grow">    
            <ContentContext.Provider value={{handleDecrementPage, handleIncrementPage}}>
                <Routes>
                    <Route path="/" element={<LandingPage />}/>
                    <Route path="/drinks/:id" element={<DrinksView drinkChunks={drinkChunks} chunkCount={drinkChunks?.length} />}/>
                    <Route path="*" element ={<NotFound />}/>
                </Routes>
            </ContentContext.Provider>
        </main>
    );
}

export default Content;