import { useState, useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { DrinksContext } from "./App";
import DrinksView from "./DrinksView";
import ButtonBar from "./ButtonBar";


const Content = () =>{
    const { drinksContent } = useContext(DrinksContext);

    const [drinkChunks, setDrinksChunks] = useState(null);

    const chunkArray = (array, chunkSize) =>{
        return Array.from({ length: Math.ceil(array.length / chunkSize) }, (_, i) =>
          array.slice(i * chunkSize, i * chunkSize + chunkSize)
        );
    }

    useEffect(() =>{
        //sets the context for the split up pages of drinks
        if(drinksContent != null){
            const chunks = chunkArray(drinksContent, 20);
            setDrinksChunks(chunks);
        }
    }, []);

    useEffect(() =>{
        if(drinkChunks){
            //console.log(drinkChunks);
        }
    }, [drinkChunks]);
    
    
    return(
        <main>
            <Routes>
                <Route path="/" element={<h2>Select a page!</h2>}/>
                {
                    drinkChunks && drinkChunks.map((chunk, index) =>(
                        <Route path={`/${index}`} element={<DrinksView drinksChunk={chunk}/>}/>
                    ))
                    
                }
                <Route path="*" element ={<div>Page not Found 😢</div>}/>
            </Routes>
            {
                drinkChunks && <ButtonBar chunks={drinkChunks} />
            }
            
        </main>
    );
}

export default Content;