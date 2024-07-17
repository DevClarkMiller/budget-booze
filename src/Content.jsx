import { useState, useEffect, useContext } from "react";
import { Routes, Route, useNavigate, Link} from "react-router-dom";

//Components
import CardWrapper from "./mill-comps/components/CardWrapper";
import DrinksView from "./DrinksView";
import NotFound from "./utilities/NotFound";

//Context
import { DrinksContext } from "./App";

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
        //navigate('/0')
    }, [drinkChunks]);

    useEffect(() =>{
        setShowCombos(true);
    }, []);

    return(
        <main className="flex flex-col items-center justify-center">
            <Routes>
                <Route path="/" element={
                <div className="flex flex-col items-center justify-center w-full">
                    <CardWrapper className="w-3/4 flex flex-col items-center gap-5">
                        <span className="flex flex-col items-center pb-5 pt-5 border-b-2 border-black gap-5 w-3/4 text-center ">
                            <h2 className="text-5xl moul">Budget booze</h2>
                            <p className="text-3xl">The best web-app for saving money while getting drunk. Warning ⚠️ - site owner is not responsible for blacked out antics</p>
                        </span>
 
                        <h3 className="text-5xl text-center">Take me to the</h3>
                        <CardWrapper className="w-fit" style={{backgroundColor: "#1B6EDA"}}>
                            <Link to={'/0'} className="text-5xl text-white">booze! 🍺</Link>
                        </CardWrapper>
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