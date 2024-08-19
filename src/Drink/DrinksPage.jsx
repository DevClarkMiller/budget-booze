import { useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";

//Functions
import { calcStandard } from "../functions/drinkCalcs";

//Icons
import { GiGlassShot } from "react-icons/gi";
import { FaArrowLeft } from "react-icons/fa";

const DrinksPage = ({chunkIndex, chunk}) =>{
    const navigate = useNavigate();
    const {id} = useParams();

    //Memoized values
    const parsedID = useMemo(() => parseInt(id), [id]);

    const drinkRanking = useMemo(() => 
        (chunkIndex + 1) * (parsedID + 1)
    , [parsedID, chunkIndex]);
    
    const drink = useMemo(() =>{
        if(!chunk || isNaN(parsedID)) return;
        return chunk[parsedID];
    }, [chunk, parsedID]);

    const numStandards = useMemo(() => (calcStandard(drink)), [drink]);

    useEffect(() => console.log(drink), [drink]);

    const handleReturn = () =>{
        navigate(`/drinks/${chunkIndex}`);
    }

    return(
        <div className="drinkPage size-full h-screen p-3 col-flex-center">
            <div className="w-full border-b border-black flex items-center gap-3 mb-3 text-2xl">
                <button onClick={handleReturn} className="p-2"><FaArrowLeft /></button>   
                <h2 className="font-semibold underline">Page {parseInt(chunkIndex) + 1}</h2> 
            </div>
            
            <h3 className="text-xl font-Matemasie mb-5 w-full text-left">Rank In Category: # {drinkRanking}</h3>
            <div className="col-flex-center lg:flex-row lg:items-start lg:gap-5 lg:grid lg:grid-cols-3">
                <div className="w-3/4 flex justify-center lg:justify-start bg-white container aspect-square lg:col-span-2">
                    <img className="max-w-full" loading="lazy" src={drink?.image_url} alt={drink?.drink_name}/>
                </div>
                <div className="lg:col-span-1">
                    <h2 className="font-SourceSerif text-2xl font-normal text-center">{drink?.drink_name}</h2>
                    <td>{drink?.pieces_per} x {drink?.total_volume} ml</td>
                </div>
            </div>

            <h3 className="font-medium p-1 w-full border-b border-black mb-1">Additional Details</h3>
            <table className="drinkDetails w-full">
                <tbody>
                    <tr>
                        <th>Unit Price</th>
                        <td>${drink?.price}</td>
                    </tr>
                    <tr>
                        <th>Total Volume</th>
                        <td>{drink?.total_volume * drink?.pieces_per} ml</td>
                    </tr>
                    <tr>
                        <th>Standard Drinks</th>
                        <td className="flex items-center gap-4">{drink?.pieces_per} x {(numStandards / drink?.pieces_per)?.toFixed(1)} <GiGlassShot /></td>
                    </tr>
                    <tr>
                        <th>Store</th>
                        <td>{drink?.store}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default DrinksPage;