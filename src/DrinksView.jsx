import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";

//Components
import CardWrapper from "./mill-comps/components/CardWrapper";
import DrinksCard from "./DrinksCard";
import NotFound from "./utilities/NotFound";

//Icons
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

//Context
import { DrinksContext } from "./App";

const DrinksView = ({drinkChunks}) =>{    
    const navigate = useNavigate();
    const [chunk, setChunk] = useState(null);

    const {id} = useParams();

    useEffect(() =>{
        if(drinkChunks){
            setChunk(drinkChunks[parseInt(id)]);
        }
        //console.log(drinkChunks[parseInt(id)]);
    }, [drinkChunks, id]);

    const handleIncrementPage = () =>{
        if(parseInt(id) + 1 < drinkChunks.length){
            navigate(`/${parseInt(id) + 1}`);
        }
    }

    const handleDecrementPage = () =>{
        if(parseInt(id) - 1 >= 0){
            navigate(`/${parseInt(id) - 1}`);
        }
    }

    return(
        <>
            {chunk &&
                <>
                <div className="drinksView flex flex-row justify-center flex-wrap">
                    {
                        chunk && chunk.map((drink) =>(
                            <DrinksCard key={`${drink.drink_name}|${drink.id}`} drink={drink}/>
                        ))
                    }
                </div>
                <div className="flex flex-row justify-center">
                        <CardWrapper className='w-fit'>

                            <button className="flex w-full h-full justify-center items-center" onClick={handleDecrementPage}><FaArrowLeft /></button>

                        </CardWrapper>

                        <CardWrapper className='w-fit'>

                            <button className="flex justify-center items-center" onClick={handleIncrementPage}><FaArrowRight /></button>
                            
                        </CardWrapper>
                    </div>
                </>  
            }
            {!chunk && 
                <NotFound/>
            }
        </>   
    );
}

export default DrinksView;