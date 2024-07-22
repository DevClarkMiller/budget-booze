import { useContext, useMemo } from "react";
import { useLocation } from "react-router-dom";

//Components
import CardWrapper from "./mill-comps/components/CardWrapper";
import Select from 'react-select';

//Context
import { DrinksContext } from "./App";

const sortOptions = [
    {value: "standardPrice", label: "Best Value"},
    {value: "totalPrice", label: "Total Price"},
    {value: "standardQty", label: "# Standards"}
]


const Menu = () =>{
    const location = useLocation();
    const { setCurrentSort, showCombos } = useContext(DrinksContext);

    return (
        <div className={`selects nice-trans w-2/3 flex justify-end items-center gap-1 border-t border-black pt-2 ${showCombos&& "opacity-100"} ${!showCombos&& "hide"}`}>
            {setCurrentSort&& 
            <div className={`flex items-center rounded-md gap-1 h-full w-fit !p-2 ${showCombos&& "opacity-100"} ${!showCombos&& "hide"}`}>
                <h2 className="font-hind font-medium">Sort by:</h2>
                <Select 
                    placeholder="Best Value"
                    defaultValue="standardPrice"
                    className="rounded-none"
                    options={sortOptions}
                    onChange={(option) => setCurrentSort(option.value)} 
                />
            </div>}
        </div>
    );
}

export default Menu;