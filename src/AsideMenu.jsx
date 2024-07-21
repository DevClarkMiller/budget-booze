import { useContext } from "react";
import { useMediaQuery } from "react-responsive";

//Components
import CardWrapper from "./mill-comps/components/CardWrapper";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";

//Context
import { DrinksContext } from "./App";

const AsideMenu = (props) =>{
    const {handleCategoryChange, showCombos, asideActive, setAsideActive} = useContext(DrinksContext);

    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1224px)'
    })

    const checkClosePane = () =>{ if(!isDesktopOrLaptop) setAsideActive(false); }

    return(
        <aside className={`col-flex-center size-full ${props.className}`}>
            {handleCategoryChange&&
            <CardWrapper className={`flex container gap-1 h-full w-fit items-center border !p-2 ${showCombos&& "opacity-100"} ${!showCombos&& "hide"}`}>
                <h2 className="font-hind font-semibold">Category</h2>
                <select className="border rounded-lg p-1" onChange={(e) => handleCategoryChange(e.target.value)}>
                    <option value={"All"}>All</option>
                    <option value={"Spirit"}>Spirits</option>
                    <option value={"BeerCider"}>Beer & Cider</option>
                    <option value={"Wine"}>Wine</option>
                    <option value={"Cooler"}>Coolers</option>
                </select>
            </CardWrapper>}
        </aside>
    );
}

export default AsideMenu;