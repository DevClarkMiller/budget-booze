import { useContext, useState, useMemo } from "react";
import { useMediaQuery } from "react-responsive";

//Components
import CardWrapper from "./mill-comps/components/CardWrapper";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";

//Context
import { DrinksContext } from "./App";

const CategorieBtn = (props) =>{
    const {handleCategoryChange, currentCategory, setCurrentCategory} = useContext(DrinksContext);

    const isActive = useMemo(() => currentCategory === props.value, [currentCategory])

    const handleClick = () =>{
        setCurrentCategory(props.value);
        handleCategoryChange(props.value)
    }
    
    return(
        <li><button className={`nice-trans ${isActive&&"text-appleBlue"}`} onClick={handleClick}>{props.children}</button></li>
    );
}

const CategoriesSection = (props) =>{
    return(
        <div className={`categoriesSection ${props.className}`}>
            <h2 className={`font-semibold border-b border-black mb-3`}>Categories</h2>

            <ul className="flex flex-col gap-1">
                <CategorieBtn value="All">Everything</CategorieBtn>
                <CategorieBtn value="Spirit">Spirits</CategorieBtn>
                <CategorieBtn value="BeerCider">Beer and Cider</CategorieBtn>
                <CategorieBtn value="Wine">Wine</CategorieBtn>
                <CategorieBtn value="Cooler">Coolers</CategorieBtn>
            </ul>
        </div>
    );
}

const AsideMenu = (props) =>{
    const {handleCategoryChange, showCombos, asideActive, setAsideActive} = useContext(DrinksContext);

    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1224px)'
    })

    const checkClosePane = () =>{ if(!isDesktopOrLaptop) setAsideActive(false); }

    return(
        <aside className={`flex flex-col size-full bg-white rounded-md ml-5 p-5 ${props.className}`}>
            {handleCategoryChange&&<CategoriesSection />}
        </aside>
    );
}

export default AsideMenu;