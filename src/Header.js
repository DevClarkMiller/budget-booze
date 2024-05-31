import { useContext } from "react";
import { DrinksContext } from "./App";

const Header = () =>{
    const { handleCategoryChange } = useContext(DrinksContext);

    const testChange = (value) =>{
        alert(value);
    }
    
    return(
        <header className="w-full flex justify-center p-2 gap-2">
            <div className="selects w-1/3 flex gap-1">
                <span className="flex flex-col gap-1 w-1/2 border">
                    <h2 className="hind font-semibold">Sort by</h2>
                    <select>
                        <option>$/Standard</option>
                        <option>Total Price</option>
                        <option># Standards</option>
                        
                    </select>
                </span>
                {
                    handleCategoryChange &&
                    <span className="flex flex-col gap-1 w-1/2 border">
                        <h2 className="hind font-semibold">Category</h2>
                        <select onChange={(e) => handleCategoryChange(e.target.value)}>
                            <option value={"All"}>All</option>
                            <option value={"Spirit"}>Spirits</option>
                            <option value={"BeerCider"}>Beer & Cider</option>
                            <option value={"Wine"}>Wine</option>
                            <option value={"Cooler"}>Coolers</option>
                        </select>
                    </span>
                }
                
            </div>
            <h1 className="text-5xl">Budget Booze</h1>
        </header>
    );
}

export default Header;