import { useContext, useState } from "react";

//Components
import LabelInput from "../utilities/LabelInput";

//Icons
import { FaMinus, FaPlus } from "react-icons/fa";

//Context
import { DrinksContext } from "../App";

const FilterABV = () =>{
    //Context
    const {filters, filterMaxs, handleFilterChange} = useContext(DrinksContext);

    //State
    const [showInput, setShowInput] = useState(false);

    return(
        <div className="w-full">
            <button onClick={() => setShowInput(!showInput)} className="w-full text-left font-semibold mb-1 flex items-center justify-between">
                <p>Minimum ABV</p>    
                <p>{!showInput ? <FaPlus /> : <FaMinus />}</p>
            </button>
            {showInput&&<><LabelInput
                name="minABV"
                spanClassName="flex-row"
                inputClassName="text-black flex-grow"
                labelClassName="hidden"
                type="range"
                onChange={handleFilterChange}
                value={filters?.minABV}
                min={0}
                max={filterMaxs.max_BAV}
            >
                - Minimum ABV
            </LabelInput>
            <h3 className="font-thin">{filters?.minABV}</h3></>}
        </div>
    );
}

export default FilterABV;