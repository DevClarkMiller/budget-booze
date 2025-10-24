import { useContext } from "react";
import { useMediaQuery } from "react-responsive";

//Components
import SlidingPane from "react-sliding-pane";
import CategoriesSection from "./Categories/CategoriesSection";
import SelectSort from "./Categories/SelectSort";
import FilterABV from "./Categories/FilterABV";
import FilterML from "./Categories/FilterML";
import FilterQTY from "./Categories/filterQTY";

//Context
import { DrinksContext } from "./App";

const MobileAsideMenu = () => {
  const { asideActive, setAsideActive } = useContext(DrinksContext);

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1080px)",
  });

  return (
    <>
      {!isDesktopOrLaptop && (
        <SlidingPane
          title="Filters"
          isOpen={asideActive}
          from="left"
          width="100%"
          onRequestClose={() => setAsideActive(false)}
        >
          <div className="size-full flex flex-col justify-start gap-5">
            <SelectSort />
            <CategoriesSection />
            <FilterML />
            <FilterABV />
            <FilterQTY />
          </div>
        </SlidingPane>
      )}
    </>
  );
};

export default MobileAsideMenu;
