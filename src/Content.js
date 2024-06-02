import { useState, useEffect, useContext } from "react";
import { Routes, Route, useNavigate, Link} from "react-router-dom";
import { DrinksContext } from "./App";
import DrinksView from "./DrinksView";
import NotFound from "./NotFound";
import CardWrapper from "./CardWrapper";

const Content = () =>{
    const navigate = useNavigate();
    const { drinksContent, setShowCombos } = useContext(DrinksContext);
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

    useEffect(() =>{
        setShowCombos(true);
    }, []);

    return(
        <main className="flex flex-col items-center justify-center">
            <Routes>
                <Route path="/" element={
                <div className="flex items-start justify-center">
                    <CardWrapper>
                        <Link to={'/0'}><h2 className="text-5xl">Take me to the booze! 🍺</h2></Link>
                    </CardWrapper>
                    
                </div>}
                />
                {
                    drinkChunks && <Route path="/:id" element={<DrinksView drinkChunks={drinkChunks}/>}/>
                }
                <Route path="*" element ={<NotFound />}/>
            </Routes>
        </main>
    );
}

export default Content;