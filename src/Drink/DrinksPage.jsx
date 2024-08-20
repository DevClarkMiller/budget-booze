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

    const MoreDetails = () =>{
        return(
            <table className="drinkDetails w-full">
                <tbody>
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
        );
    }

    const MainDetails = () =>{
        return(
            <>
                <h2 className="font-SourceSerif text-3xl font-normal text-center lg:text-left">{drink?.drink_name}</h2>
                <td>{drink?.pieces_per} x {drink?.total_volume} ml</td>

                <h2 className="text-3xl font-semibold">${drink?.price?.toFixed(2)}</h2>

                <h3 className="font-medium p-1 w-full border-b border-black mb-1">Additional Details</h3>
            </>
        );
    }

    return(
        <div className="drinkPage size-full h-screen p-3 col-flex-center">
            <div className="w-full border-b border-black flex items-center gap-3 mb-3 text-2xl">
                <button onClick={ handleReturn } className="p-2"><FaArrowLeft /></button>   
                <h2 className="font-semibold underline">Page {parseInt(chunkIndex) + 1}</h2> 
            </div>
            
            <h3 className="text-xl font-Matemasie mb-5 w-full text-left">Rank In Category: # {drinkRanking}</h3>
            <div className="col-flex-center w-full lg:flex-row lg:w-5/6 lg:gap-5 lg:grid lg:grid-cols-3 lg:place-items-center">
                <div className="w-3/4 bg-white container row-flex-center items-center aspect-square p-2 lg:w-1/2 lg:col-span-2 mb-2 lg:mb-0">
                    <img className="size-3/4 object-contain" loading="lazy" src={drink?.image_url} alt={drink?.drink_name}/>
                </div>
                <div className="flex w-full flex-col gap-3 lg:col-span-1">
                    <MainDetails />
                    <MoreDetails />
                </div>
            </div>
        </div>
    );
}

export default DrinksPage;