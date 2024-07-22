import { useContext, useMemo } from "react";
import { useMediaQuery } from "react-responsive";

//Components
import SelectSort from "./Categories/SelectSort";

//Icons
import { RxHamburgerMenu } from "react-icons/rx";

//Context
import { DrinksContext } from "./App";

const Menu = () =>{
    const { showCombos, setAsideActive, setCurrentSort } = useContext(DrinksContext);

    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1080px)'
    })

    return (
        <div className={`selects nice-trans w-2/3 flex justify-between lg:justify-end items-center gap-1 border-t border-black pt-2 mb-2 ${showCombos&& "opacity-100"} ${!showCombos&& "hide"}`}>
            {!isDesktopOrLaptop&&
            <button onClick={() => setAsideActive(true)} className="nice-trans hover:text-appleBlue text-2xl"><RxHamburgerMenu /></button>
            }

            {setCurrentSort&&isDesktopOrLaptop&&<SelectSort />}
        </div>
    );
}

export default Menu;