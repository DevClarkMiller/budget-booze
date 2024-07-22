import { useContext } from "react";
import { useMediaQuery } from "react-responsive";

//Components
import SlidingPane from "react-sliding-pane";
import CategoriesSection from "./Categories/CategoriesSection";
import SelectSort from "./Categories/SelectSort";

//Context
import { DrinksContext } from "./App";

const MobileAsideMenu = () =>{
    const {asideActive, setAsideActive} = useContext(DrinksContext);

    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1080px)'
    })

    return(
        <>{!isDesktopOrLaptop&&
            <SlidingPane
                isOpen={asideActive}
                from="left"
                width="100%"
                onRequestClose={() => setAsideActive(false)}  
            >
                <div className="size-fit flex flex-col">
                    <SelectSort />
                    <CategoriesSection />
                </div>
            </SlidingPane> 
        }</>
    );
}

export default MobileAsideMenu;