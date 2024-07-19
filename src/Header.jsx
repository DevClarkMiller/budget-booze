import { useContext, useEffect, useMemo } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

//Components
import CardWrapper from "./mill-comps/components/CardWrapper";

//Icons
import { IoIosBeer } from "react-icons/io";
import { FcAbout } from "react-icons/fc";

//Context
import { DrinksContext } from "./App";

const Header = ({setCurrentSort}) =>{
    const navigate = useNavigate();
    const location = useLocation();
    const { handleCategoryChange } = useContext(DrinksContext);

    //Memoized values
    const showCombos = useMemo(() =>( !(location?.pathname.includes("about") || location?.pathname === "/")), [location?.pathname]);
    
    return(
        <header className="w-full flex flex-col items-center p-2 gap-5">
            <span className="w-3/4 flex flex-row justify-center items-center">
                <Link to="/" className="text-5xl flex-grow flex justify-center" ><h1>Budget Booze</h1></Link>
                {location.pathname.includes("about") ?
                    <IoIosBeer onClick={() => navigate('/')} className="justify-self-end flex-none text-3xl cursor-pointer hover-beer"/>
                    :
                    <FcAbout onClick={() => navigate('/about')} className="justify-self-end flex-none text-3xl cursor-pointer"/>
                }
            </span>
            
            <div className={`selects nice-trans w-5/6 flex items-center gap-1 border-t border-black pt-2 ${showCombos&& "opacity-100"} ${!showCombos&& "hide"}`}>
                {setCurrentSort&& 
                <CardWrapper className={`flex flex-col gap-1 h-full w-1/2 border p-1 ${showCombos&& "opacity-100"} ${!showCombos&& "hide"}`}>
                    <h2 className="font-hind font-semibold">Sort by</h2>
                    <select className="border rounded-lg p-1" onChange={(e) => setCurrentSort(e.target.value)}>
                        <option value={"standardPrice"}>Best Value</option>
                        <option value={"totalPrice"}>Total Price</option>
                        <option value={"standardQty"}># Standards</option>
                    </select>
                </CardWrapper>}
                
                {handleCategoryChange&&
                <CardWrapper className={`flex flex-col gap-1 h-full w-1/2 border p-1 ${showCombos&& "opacity-100"} ${!showCombos&& "hide"}`}>
                    <h2 className="font-hind font-semibold">Category</h2>
                    <select className="border rounded-lg p-1" onChange={(e) => handleCategoryChange(e.target.value)}>
                        <option value={"All"}>All</option>
                        <option value={"Spirit"}>Spirits</option>
                        <option value={"BeerCider"}>Beer & Cider</option>
                        <option value={"Wine"}>Wine</option>
                        <option value={"Cooler"}>Coolers</option>
                    </select>
                </CardWrapper>}
            </div>  
        </header>
    );
}

export default Header;