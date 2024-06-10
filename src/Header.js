import { useContext } from "react";
import { DrinksContext } from "./App";
import CardWrapper from "./CardWrapper";
import { FcAbout } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { IoIosBeer } from "react-icons/io";

const Header = ({setCurrentSort, showCombos}) =>{
    const navigate = useNavigate();
    const { handleCategoryChange } = useContext(DrinksContext);

    const testChange = (value) =>{
        alert(value);
    }
    
    return(
        <header className="w-full flex flex-col items-center p-2 gap-5">
            <span className="w-3/4 flex flex-row justify-center items-center">
                <h1 className="text-5xl flex-1 flex justify-center">Budget Booze</h1>
                {
                    !showCombos ?
                    <IoIosBeer onClick={() => navigate('/')} className="justify-self-end flex-none text-3xl cursor-pointer"/>
                    :
                    <FcAbout onClick={() => navigate('/about')} className="justify-self-end flex-none text-3xl cursor-pointer"/>
                }
                
            </span>
            
            <div className="selects w-5/6 flex items-center gap-1 border-t border-black	pt-2">
                {
                    showCombos &&
                    <>
                        {
                            setCurrentSort && 
                            <CardWrapper className="flex flex-col gap-1 h-full w-1/2 border p-1">
                                <h2 className="hind font-semibold">Sort by</h2>
                                <select className="border rounded-lg p-1" onChange={(e) => setCurrentSort(e.target.value)}>
                                    <option value={"standardPrice"}>Best Value</option>
                                    <option value={"totalPrice"}>Total Price</option>
                                    <option value={"standardQty"}># Standards</option>
                                </select>
                            </CardWrapper>
                        }
                        
                        {
                            handleCategoryChange &&
        
                            <CardWrapper className="flex flex-col gap-1 h-full w-1/2 border p-1">
                                <h2 className="hind font-semibold">Category</h2>
                                <select className="border rounded-lg p-1" onChange={(e) => handleCategoryChange(e.target.value)}>
                                    <option value={"All"}>All</option>
                                    <option value={"Spirit"}>Spirits</option>
                                    <option value={"BeerCider"}>Beer & Cider</option>
                                    <option value={"Wine"}>Wine</option>
                                    <option value={"Cooler"}>Coolers</option>
                                </select>
                            </CardWrapper>
                        }
                    </>
                }
                
            </div>
            
        </header>
    );
}

export default Header;