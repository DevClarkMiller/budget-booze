import { useContext, useState, useMemo } from "react";
import { useMediaQuery } from "react-responsive";

//Components
import CardWrapper from "./mill-comps/components/CardWrapper";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import CategoriesSection from "./Categories/CategoriesSection";

//Context
import { DrinksContext } from "./App";


const AsideMenu = (props) =>{
    const {handleCategoryChange, showCombos, asideActive, setAsideActive} = useContext(DrinksContext);

    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1080px)'
    })

    const checkClosePane = () =>{ if(!isDesktopOrLaptop) setAsideActive(false); }

    return(
        <aside className={`flex flex-col size-full bg-white rounded-md ml-5 p-5 ${props.className}`}>
            {handleCategoryChange&&<CategoriesSection />}
        </aside>
    );
}

export default AsideMenu;