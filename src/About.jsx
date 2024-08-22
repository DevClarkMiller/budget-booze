import { useEffect } from "react";

//Components
import CardWrapper from "./mill-comps/components/CardWrapper";
import { ShakeLittle } from "reshake";
import CardArray from "./utilities/CardArray";

//Icons
import { FaGithubSquare , FaLinkedin  } from "react-icons/fa";

const About = ({socialsBottom}) => {

    return(
        <div className={`aboutPage ${!socialsBottom && "min-h-screen "} p-3 flex flex-col gap-5`}>

            {!socialsBottom && <div className="socials w-full flex justify-center gap-4">
                <ShakeLittle>
                    <FaLinkedin onClick={() => window.open("https://www.linkedin.com/in/clark-miller-b14718290/", "_blank")} className="text-5xl cursor-pointer"/>
                </ShakeLittle>
                <ShakeLittle>
                    <FaGithubSquare onClick={() => window.open("https://github.com/DevClarkMiller?tab=repositories", "_blank")} className="text-5xl cursor-pointer"/>
                </ShakeLittle>
            </div>}

            <h3 className="ml-12 mt-6 text-4xl font-bold">Timeline</h3>
            <CardArray>
                <>
                    <p className="title">Body weight calculator for determing # drinks needed to get 
                    plastered</p>
                    <p className="timeline">Next in queue</p>
                </>
                <>
                    <p className="title">Shopping cart to compile drinks of interest and proceed to checkout
                    on the lcbo website</p>
                    <p className="timeline">Later on</p>
                </>
                <>
                    <p className="title">Official release of an IOS/Android app!</p>
                    <p className="timeline">Way later on</p>
                </>
            </CardArray>
            
            <h3 className="ml-12 mt-6 text-4xl font-bold">About</h3>
            <div className="w-full flex justify-center">
                <div className="col-flex-center w-full lg:w-4/6 lg:grid grid-cols-2 gap-5 text-white font-semibold text-2xl">
                    <p className="about-card">
                        The purpose of this project is to give the power back to the consumer. The LCBO's website's
                            sorting algorithm doesn't take into account the true value of each product, their sales are
                            never as good as they seem and their advertising will try to tell you otherwise. So I've
                            taken things into my own hands and am here to provide you with the best shopping experience.
                        
                    </p>
                    <p className="about-card">
                        I am a second year computer programming and analyst student and I love to go out with
                            my friends, however I don't like spending money. A lot of my projects are oriented around
                            saving money and passing the savings off to other people, not just myself.
                        
                    </p>
                </div>
            </div>

            {socialsBottom && <div className="socials w-full flex justify-center gap-4">
                <ShakeLittle>
                    <FaLinkedin onClick={() => window.open("https://www.linkedin.com/in/clark-miller-b14718290/", "_blank")} className="text-5xl cursor-pointer"/>
                </ShakeLittle>
                <ShakeLittle>
                    <FaGithubSquare onClick={() => window.open("https://github.com/DevClarkMiller?tab=repositories", "_blank")} className="text-5xl cursor-pointer"/>
                </ShakeLittle>
            </div>}
        </div>
    );
}

export default About;