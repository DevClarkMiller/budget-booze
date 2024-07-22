import { useContext, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

//Components
import CardWrapper from "./mill-comps/components/CardWrapper";
import Select from 'react-select';
import SelectSort from "./Categories/SelectSort";

//Icons
import { RxHamburgerMenu } from "react-icons/rx";

//Context
import { DrinksContext } from "./App";

const Menu = () =>{
    const location = useLocation();
    const { setCurrentSort, showCombos, asideActive, setAsideActive } = useContext(DrinksContext);

    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1080px)'
    })

    return (
        <div className={`selects nice-trans w-2/3 flex justify-between lg:justify-end items-center gap-1 border-t border-black pt-2 mb-2 ${showCombos&& "opacity-100"} ${!showCombos&& "hide"}`}>
            {!isDesktopOrLaptop&&
            <button onClick={() => setAsideActive(true)} className="nice-trans hover:text-appleBlue text-2xl"><RxHamburgerMenu /></button>
            }

            {/* {setCurrentSort&&<SelectSort />} */}
        </div>
    );
}

export default Menu;