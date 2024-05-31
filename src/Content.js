import { useState, useEffect, useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { DrinksContext } from "./App";
import DrinksView from "./DrinksView";

const Content = () =>{
    const navigate = useNavigate();
    const { drinksContent } = useContext(DrinksContext);
    const [drinkChunks, setDrinkChunks] = useState(null);
    const [chunksShown, setChunksShown] = useState(0);


    const chunkArray = (array, chunkSize) =>{
        return Array.from({ length: Math.ceil(array.length / chunkSize) }, (_, i) =>
          array.slice(i * chunkSize, i * chunkSize + chunkSize)
        );
    }

    useEffect(() =>{
        //sets the context for the split up pages of drinks
        if(drinksContent){
            const chunks = chunkArray(drinksContent, 50);
            setDrinkChunks(chunks);
        }
    }, [drinksContent]);

    useEffect(() =>{
        navigate('/0')
    }, [drinkChunks]);

    return(
        <main className="flex flex-col items-center justify-center">
            <Routes>
                <Route path="/" element={<h2>Select a page!</h2>}/>
                {
                    drinkChunks && <Route path="/:id" element={<DrinksView drinkChunks={drinkChunks}/>}/>
                }
                
                <Route path="*" element ={<div>Page not Found 😢</div>}/>
            </Routes>
        </main>
    );
}

export default Content;