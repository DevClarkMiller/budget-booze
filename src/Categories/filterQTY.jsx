import { useContext, useState } from "react";

//Components
import LabelInput from "../utilities/LabelInput";

//Icons
import { FaMinus, FaPlus } from "react-icons/fa";

//Context
import { DrinksContext } from "../App";

const FilterQTY = () =>{
    //Context
    const {filters, filterMaxs, handleFilterChange} = useContext(DrinksContext);

    //State
    const [showInput, setShowInput] = useState(false);
    return(
        <div className="w-full">
            <button onClick={() => setShowInput(!showInput)} className="w-full text-left font-semibold mb-1 flex items-center justify-between">
                <p>Minimum Quantity</p>    
                <p>{!showInput ? <FaPlus /> : <FaMinus />}</p>
            </button>
            {showInput&&<><LabelInput
                name="minQTY"
                spanClassName="flex-row"
                inputClassName="text-black flex-grow"
                labelClassName="hidden"
                type="range"
                onChange={handleFilterChange}
                value={filters?.minQTY}
                min={0}
                max={filterMaxs?.max_QTY}
            >
                - Minimum Qty
            </LabelInput>
            <h3 className="font-thin">{filters?.minQTY}</h3></>}
        </div>
    );
}

export default FilterQTY;