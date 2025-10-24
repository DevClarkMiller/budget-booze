import { useContext } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

//Icons
import { RxHamburgerMenu } from "react-icons/rx";

//Context
import { DrinksContext } from "./App";

const Header = () => {
  const { showCombos, setAsideActive } = useContext(DrinksContext);

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  return (
    <header className="w-full col-flex-center p-2 gap-5 bg-appleGray">
      <span className="w-full px-3 flex flex-row justify-center items-center">
        <button
          disabled={isDesktopOrLaptop ? true : false}
          onClick={() => setAsideActive(true)}
          className={`nice-trans text-white hover:text-appleBlue text-3xl lg:hidden ${showCombos && "opacity-100"} ${!showCombos && "hide"}`}
        >
          <RxHamburgerMenu />
        </button>

        <Link
          to="/"
          className="text-beerOrange nice-trans text-5xl flex-grow flex justify-center mb-3 hover:text-beerLightOrange"
        >
          <h1>Budget Booze</h1>
        </Link>
      </span>
    </header>
  );
};

export default Header;
