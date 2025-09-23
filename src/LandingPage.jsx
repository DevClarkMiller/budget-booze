import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//Components
import About from "./About";
import DrinksCard from "./Drink/DrinksCard";
import { Bars } from "react-loading-icons";

//Context
import { DrinksContext } from "./App";

const LandingPage = () =>{
    const navigate = useNavigate();
    
    //State
    const [displayDrink, setDisplayDrink] = useState(null);

    const { drinksContent } = useContext(DrinksContext);

    //TODO - MAKE THIS START AN INTERVAL THAT RANDOMLY GRABS A DRINK
    useEffect(() =>{
        if (drinksContent){
            const DRINK_THRESHOLD = 25;
            let randomIndex = 0;
            //Pick within the first 50 drinks
            if (DRINK_THRESHOLD <= drinksContent.length){
                randomIndex = Math.floor(Math.random() * DRINK_THRESHOLD);
            }
            
            setDisplayDrink(drinksContent[randomIndex]);
        }
    }, [drinksContent]);

    return(
        <div className="size-full flex-grow">
            <div className="w-full col-flex-center p-3 gap-5 lg:grid grid-cols-2 lg:gap-3">
                <div className="drinksNDescription size-full grid grid-rows-3 col-span-1 container">
                    <div className="drinks-entry-container size-full rounded-t-lg row-span-2">
                        <button className="drinks-entry-btn size-full text-white p-2 " onClick={() => navigate('/drinks/0')}>
                            <span className="z-30">
                                <h2 className="font-semibold text-2xl md:text-3xl lg:text-4xl text-center overflow-hidden overflow-ellipsis">Take me to the booze! 🍺</h2>
                                <h3 className="text-xl md:text-2xl font-semibold italic w-full flex justify-end pr-4 md:pr-16 pt-2">
                                    "More booze for your buck"
                                </h3>
                            </span>
                        </button>
                    </div>
                    <div className="mission-statement p-2 bg-beerDarkOrange flex items-center text-white rounded-b-lg">
                        <p className="text-xl md:text-2xl lg:text-3xl font-hind lg:text-center font-thin">
                            Your center for drinking on a budget, the last and only 
                            web-app you'll need for getting drunk as cheaply as you can
                        </p>
                    </div>
                </div>
                <div className="random-pick-card size-full col-flex-center col-span-1 bg-white p-2 container nice-trans">
                    <h4 className="font-Lobster text-4xl mb-2">Random Top Pick</h4>
                    { displayDrink != null ? <DrinksCard className={`!rounded-none !shadow-none !w-5/6`} index={0} drink={displayDrink} /> : 
                    <div className="h-96 flex items-center justify-center">
                        <Bars stroke="black"/>
                    </div> }
                </div> 
            </div>


            <About socialsBottom/>
        </div>
    )
}

export default LandingPage;