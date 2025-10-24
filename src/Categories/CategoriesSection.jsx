import { useState } from "react";

//Components
import CategoriesBtn from "./CategoriesBtn";

//Icons
import { FaMinus, FaPlus } from "react-icons/fa";

const CategoriesSection = (props) => {
  //State
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className={`categoriesSection ${props.className}`}>
      <button
        onClick={() => setShowOptions(!showOptions)}
        className={`w-full text-left font-semibold mb-1 flex items-center justify-between`}
      >
        <p>Categories</p>
        <p>{!showOptions ? <FaPlus /> : <FaMinus />}</p>
      </button>
      {showOptions && (
        <ul className="flex flex-col gap-1">
          <CategoriesBtn value="All">Everything</CategoriesBtn>
          <CategoriesBtn value="Spirit">Spirits</CategoriesBtn>
          <CategoriesBtn value="BeerCider">Beers/Ciders</CategoriesBtn>
          <CategoriesBtn value="Wine">Wine</CategoriesBtn>
          <CategoriesBtn value="Cooler">Coolers</CategoriesBtn>
        </ul>
      )}
    </div>
  );
};

export default CategoriesSection;
