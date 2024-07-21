import { useContext, useEffect, useMemo } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

//Components
import CardWrapper from "./mill-comps/components/CardWrapper";

//Icons
import { IoIosBeer } from "react-icons/io";
import { FcAbout } from "react-icons/fc";

//Context
import { DrinksContext } from "./App";

const Header = ({setCurrentSort}) =>{
    const navigate = useNavigate();
    const location = useLocation();
    
    return(
        <header className="w-full flex flex-col items-center p-2 gap-5">
            <span className="w-3/4 flex flex-row justify-center items-center">
                <Link to="/" className="text-5xl flex-grow flex justify-center" ><h1>Budget Booze</h1></Link>
                {location.pathname.includes("about") ?
                    <IoIosBeer onClick={() => navigate('/')} className="justify-self-end flex-none text-3xl cursor-pointer hover-beer"/>
                    :
                    <FcAbout onClick={() => navigate('/about')} className="justify-self-end flex-none text-3xl cursor-pointer"/>
                }
            </span> 
        </header>
    );
}

export default Header;