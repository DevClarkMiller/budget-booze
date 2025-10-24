import { useContext } from "react";
import { useMediaQuery } from "react-responsive";

//Components
import SelectSort from "./Categories/SelectSort";

//Icons
// import { RxHamburgerMenu } from "react-icons/rx";

//Context
import { DrinksContext } from "./App";

const Menu = () => {
  const { showCombos, setCurrentSort } = useContext(DrinksContext);

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  return (
    <div
      className={`selects nice-trans w-3/4 lg:w-5/6 flex justify-between lg:justify-end items-center gap-1 pt-2 mb-2 ${showCombos && "opacity-100"} ${!showCombos && "hide"}`}
    >
      {/* <button disabled={isDesktopOrLaptop ? true : false} onClick={() => setAsideActive(true)} className="nice-trans hover:text-appleBlue text-3xl lg:hidden"><RxHamburgerMenu /></button> */}

      {setCurrentSort && isDesktopOrLaptop && <SelectSort />}
    </div>
  );
};

export default Menu;
