import { useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";

//Components
import TableWBody from '../utilities/tables/TableWBody';
import TableFullRow from "../utilities/tables/TableFullRow";

//Functions
import { calcStandard } from "../functions/drinkCalcs";

//Icons
import { GiGlassShot } from "react-icons/gi";
import { FaArrowLeft } from "react-icons/fa";

//Json
import countries from '../utilities/countries.json';

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

    const countryCode = useMemo(() => countries?.find((country) => country.name === drink?.origin_country)?.code ,[countries, drink]);

    const flagUrl = useMemo(() => `https://flagsapi.com/${countryCode}/flat/64.png`, [countryCode]);

    useEffect(() => console.log(drink), [drink]);

    const handleReturn = () =>{
        navigate(`/drinks/${chunkIndex}`);
    }

    const handleVisitStore = () =>{
        window.open(drink?.link, "_blank");
    }

    // useEffect(() => console.log(drink),[drink]);

    const MoreDetails = () =>{
        const standardContent = useMemo(() => `${drink?.pieces_per} x ${(numStandards / drink?.pieces_per)?.toFixed(1)}`, [drink]);

        return(
            <>
                <h3 className="font-medium p-1 w-full border-b border-black mb-1">Additional Details</h3>
                <TableWBody tableClassName={`drinkDetails w-full`}>
                    <TableFullRow th="Total Volume"><td>{drink?.total_volume * drink?.pieces_per} ml</td></TableFullRow> 
                    
                    <TableFullRow th="Alc / Vol"><td>{drink?.alcohol_percent?.toFixed(1)}%</td></TableFullRow>

                    <TableFullRow th="Standard Drinks"><td className="flex items-center gap-4">{standardContent}<GiGlassShot /></td></TableFullRow>

                    <TableFullRow th="Container"><td>{drink?.container}</td></TableFullRow>

                    <TableFullRow th="Store"><td>{drink?.store}</td></TableFullRow>
                </TableWBody>
            </>
        );
    }

    const MainDetails = () =>{
        return(
            <>
                <h2 className="font-[sans-serif] text-3xl font-semibold text-center lg:text-left">{drink?.drink_name}</h2>
                <p className="font-[sans-serif] font-medium">{drink?.pieces_per} x {drink?.total_volume} ml</p>
                <p className="text-3xl font-medium font-[sans-serif]">${drink?.price?.toFixed(2)}</p>
            </>
        );
    }

    return(
        <div className="drinkPage mb-auto size-full p-3 col-flex-center">
            <div className="w-full border-b border-black flex items-center gap-3 mb-3 pb-2 text-2xl">
                <button onClick={handleReturn} className="p-2 nice-trans hover:text-appleLightBlue"><FaArrowLeft /></button>   
                <h2 className="font-semibold">Page {parseInt(chunkIndex) + 1}</h2> 
            </div>  
            
            <div className="w-full flex flex-col items-start">
                <h3 className="text-xl font-bold mb-5 text-left font-[sans-serif]">Rank In Category: # {drinkRanking}</h3>
    
                {drink?.origin_country&&flagUrl ?  <img src={flagUrl} alt={drink?.origin_country}/> :
                    <p className="text-2xl font-semibold">Product of {drink?.origin_country}</p>}
                
            </div>
            <div className="col-flex-center w-full lg:flex-row lg:w-5/6 lg:gap-5 lg:grid lg:grid-cols-2 lg:place-items-center">
                <div className="w-3/4 bg-white container row-flex-center items-center aspect-square p-2 lg:w-2/3 lg:col-span-1 mb-2 lg:mb-0">
                    <img className="size-3/4 object-contain" loading="lazy" src={drink?.image_url} alt={drink?.drink_name}/>
                </div>
                <div className="flex w-full flex-col gap-3 lg:col-span-1">
                    <MainDetails />
                    <p className="mb-3 font-hind">{drink?.description}</p>
                    <button onClick={handleVisitStore} className="card-btn nice-trans bg-appleBlue hover:bg-appleLightBlue text-white font-semibold text-xl">See on {drink?.store}</button>
                    <MoreDetails />
                </div>
            </div>
        </div>
    );
}

export default DrinksPage;