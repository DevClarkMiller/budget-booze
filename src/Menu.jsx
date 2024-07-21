import { useContext, useMemo } from "react";
import { useLocation } from "react-router-dom";

//Components
import CardWrapper from "./mill-comps/components/CardWrapper";

//Context
import { DrinksContext } from "./App";


const Menu = () =>{
    const location = useLocation();
    const { setCurrentSort, showCombos } = useContext(DrinksContext);

    return (
        <div className={`selects nice-trans w-5/6 flex justify-end items-center gap-1 border-t border-black pt-2 ${showCombos&& "opacity-100"} ${!showCombos&& "hide"}`}>
            {setCurrentSort&& 
            <CardWrapper className={`flex items-center container gap-1 h-full w-fit border !p-2 ${showCombos&& "opacity-100"} ${!showCombos&& "hide"}`}>
                <h2 className="font-hind font-semibold">Sort by</h2>
                <select className="border rounded-lg p-1" onChange={(e) => setCurrentSort(e.target.value)}>
                    <option value={"standardPrice"}>Best Value</option>
                    <option value={"totalPrice"}>Total Price</option>
                    <option value={"standardQty"}># Standards</option>
                </select>
            </CardWrapper>}
        </div>
    );
}

export default Menu;