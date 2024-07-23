import { useContext, useState, useMemo } from "react";
import { useMediaQuery } from "react-responsive";

//Components
import "react-sliding-pane/dist/react-sliding-pane.css";
import CategoriesSection from "./Categories/CategoriesSection";

import FilterML from "./Categories/FilterML";
import FilterABV from "./Categories/FilterABV";
import FilterQTY from "./Categories/filterQTY";

//Context
import { DrinksContext } from "./App";


const AsideMenu = (props) =>{
    const {handleCategoryChange, showCombos, asideActive, setAsideActive, handleFilterChange} = useContext(DrinksContext);

    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1080px)'
    })

    const checkClosePane = () =>{ if(!isDesktopOrLaptop) setAsideActive(false); }

    return(
        <aside className={`flex flex-col size-full bg-white rounded-md ml-5 p-5 gap-3 ${props.className}`}>
            {handleCategoryChange&&<CategoriesSection />}
            <FilterML />
            <FilterABV />
            <FilterQTY />
        </aside>
    );
}

export default AsideMenu;