import { Link } from "react-router-dom";
import CardWrapper from "./CardWrapper";
const NotFound = () =>{
    return(
        <div className="notFound w-full h-full flex items-center justify-center">
            <CardWrapper className="flex flex-col gap-5 items-center">
                <h2 className="text-9xl pb-5">404</h2>
                <h3 className="text-5xl border-b-2 pb-5	 border-black">Not the page you're looking for!</h3>
                <CardWrapper className=" w-fit" style={{backgroundColor: "#1B6EDA"}}>
                    <Link className="flex justify-center text-white" to={'/'}><h2 className="text-5xl">Take me home! 🍺</h2></Link>
                </CardWrapper>
                
                <p></p>
            </CardWrapper>
        </div>
    );
}

export default NotFound;