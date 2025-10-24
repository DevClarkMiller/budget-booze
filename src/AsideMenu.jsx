import { useContext } from "react";

//Components
import "react-sliding-pane/dist/react-sliding-pane.css";
import CategoriesSection from "./Categories/CategoriesSection";

import FilterML from "./Categories/FilterML";
import FilterABV from "./Categories/FilterABV";
import FilterQTY from "./Categories/filterQTY";

//Context
import { DrinksContext } from "./App";

const AsideMenu = (props) => {
  const { handleCategoryChange } = useContext(DrinksContext);

  return (
    <aside
      className={`flex flex-col size-full bg-white rounded-md ml-5 p-5 gap-3 ${props.className}`}
    >
      {handleCategoryChange && <CategoriesSection />}
      <FilterML />
      <FilterABV />
      <FilterQTY />
    </aside>
  );
};

export default AsideMenu;
