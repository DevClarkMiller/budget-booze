import { useEffect } from "react";

//Components
import CardWrapper from "./CardWrapper";
import { ShakeLittle } from "reshake";

//Icons
import { FaGithubSquare , FaLinkedin  } from "react-icons/fa";


const About = ({setShowCombos}) => {
    useEffect(() =>{ setShowCombos(false); }, []);

    return(
        <div className="aboutPage min-h-screen p-3 flex flex-col gap-5">

            <div className="socials w-full flex justify-center gap-4">
                <ShakeLittle>
                    <FaLinkedin onClick={() => window.open("https://www.linkedin.com/in/clark-miller-b14718290/", "_blank")} className="text-5xl cursor-pointer"/>
                </ShakeLittle>
                <ShakeLittle>
                    <FaGithubSquare onClick={() => window.open("https://github.com/DevClarkMiller?tab=repositories", "_blank")} className="text-5xl cursor-pointer"/>
                </ShakeLittle>
            </div>
            
            <CardWrapper>
                <h2 className="hind font-bold text-3xl">About the Project</h2>
                <p>The purpose of this project is to give the power back to the consumer. The LCBO's website's
                    sorting algorithm doesn't take into account the true value of each product, their sales are
                    never as good as they seem and their advertising will try to tell you otherwise. So I've
                    taken things into my own hands and am here to provide you with the best shopping experience.
                </p>
            </CardWrapper>
            <CardWrapper>
                <h2 className="hind font-bold text-3xl">About the Creator</h2>
                <p>I am a second year computer programming and analyst student and I love to go out with
                    my friends, however I don't like spending money. A lot of my projects are oriented around
                    saving money and passing the savings off to other people, not just myself.
                </p>
            </CardWrapper>
            <CardWrapper>
                <h2 className="hind font-bold text-3xl">Future Updates</h2>
                <ul>
                    <li className="border-b border-black p-1">Next in queue - Body weight calculator for determing # drinks needed to get 
                        plastered
                    </li>
                    <li className="border-b border-black p-1">Later on - Shopping cart to compile drinks of interest and proceed to checkout
                    on the lcbo website</li>
                    <li className="border-b border-black p-1">Way later on - Official release of an IOS/Android app!</li>
                </ul>
            </CardWrapper>
        </div>
    );
}

export default About;