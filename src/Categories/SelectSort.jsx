import { useContext } from "react";

//Components
import Select from 'react-select';

//Context
import { DrinksContext } from "../App";

const sortOptions = [
    {value: "standardPrice", label: "Best Value"},
    {value: "totalPrice", label: "Total Price"},
    {value: "standardQty", label: "# Standards"}
]

const SelectSort = () =>{
    const {showCombos, setCurrentSort} = useContext(DrinksContext);

    return(
        <div className={`flex items-center rounded-md gap-2 h-full w-fit !p-2 !pl-0 ${showCombos&& "opacity-100"} ${!showCombos&& "hide"}`}>
            <h2 className="font-hind font-medium">Sort by:</h2>
            <Select 
                placeholder="Best Value"
                defaultValue="standardPrice"
                className="rounded-none"
                options={sortOptions}
                onChange={(option) => setCurrentSort(option.value)} 
            />
        </div>
    );
}

export default SelectSort;