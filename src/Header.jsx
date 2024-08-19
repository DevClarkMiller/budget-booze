import { useContext, useEffect, useMemo } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

//Components
import CardWrapper from "./mill-comps/components/CardWrapper";
import { ShakeLittle } from "reshake";

//Icons
import { IoIosBeer } from "react-icons/io";
import { FcAbout } from "react-icons/fc";

//Context
import { DrinksContext } from "./App";

const Header = ({setCurrentSort}) =>{
    const navigate = useNavigate();
    const location = useLocation();
    
    return(
        <header className="w-full col-flex-center p-2 gap-5 bg-appleGray">
            <span className="w-3/4 flex flex-row justify-center items-center">
                <Link to="/" className="text-beerOrange nice-trans text-5xl flex-grow flex justify-center mb-3 hover:text-beerLightOrange">
                    <h1>Budget Booze</h1>
                </Link>
                {/* {location.pathname.includes("about") ?
                    <IoIosBeer onClick={() => navigate('/')} className="text-white justify-self-end flex-none text-3xl cursor-pointer hover-beer"/>
                    :
                    <ShakeLittle>
                        <FcAbout onClick={() => navigate('/about')} className="justify-self-end flex-none text-3xl cursor-pointer"/>
                    </ShakeLittle>
                } */}
            </span> 
        </header>
    );
}

export default Header;