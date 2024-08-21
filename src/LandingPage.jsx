import { useNavigate } from "react-router-dom";

//Components
import About from "./About";

//Images
import MeBoozing from './images/Boozer.jpeg';

const LandingPage = () =>{
    const navigate = useNavigate();

    const Quadrant = (props) =>{
        return(
            <div className={`size-full bg-white p-2 container !rounded-none col-flex-center justify-center overflow-hidden ${props.className}`}>
                {props.children}
            </div>
        );
    }

    return(
        <div className="size-full flex-grow">
            <div className="w-full grid grid-cols-2 grid-rows-2 p-5 gap-3">
                <button className="card-btn nice-trans container !rounded-none bg-beerOrange hover:bg-beerLightOrange text-white" onClick={() => navigate('/drinks/0')}>
                    <h2 className="font-semibold text-2xl md:text-3xl lg:text-4xl text-center overflow-hidden overflow-ellipsis">Take me to the booze! 🍺</h2>
                </button>
                <Quadrant>
                    <h2 className="font-semibold text-2xl md:text-3xl lg:text-4xl text-center overflow-hidden overflow-ellipsis">Over 6000 drinks processed daily!</h2>
                </Quadrant>
                <Quadrant>
                    <p className="text-center text-xl md:text-2xl">Your center for drinking on a budget, the last and only web-app you'll need for getting drunk as cheaply as you can</p>
                    <h2 className="font-semibold text-2xl md:text-3xl lg:text-4xl text-center overflow-hidden overflow-ellipsis"></h2>
                </Quadrant>
                <Quadrant className="lg:flex-row gap-3 justify-between">
                    <h2 className="w-2/3 font-semibold text-1xl md:text-3xl lg:text-4xl text-center overflow-hidden overflow-ellipsis">The results speak for themselves</h2>
                    <img className="w-5/6 md:w-1/2 lg:w-1/4" src={MeBoozing}></img>
                </Quadrant>
            </div>
            <About socialsBottom/>
        </div>
    )
}

export default LandingPage;