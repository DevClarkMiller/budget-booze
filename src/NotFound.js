import { Link } from "react-router-dom";
import CardWrapper from "./CardWrapper";
const NotFound = () =>{
    return(
        <div className="notFound w-full h-full flex items-center justify-center">
            <CardWrapper className="flex flex-col gap-5">
                <h2 className="text-5xl border-b-2 pb-5	 border-black">Not the page you're looking for! 🍺</h2>
                <Link className="flex justify-center" to={'/'}><h2 className="text-5xl flex justify-center border w-fit p-2 rounded-md border-black">Take me home!</h2></Link>
            </CardWrapper>
        </div>
    );
}

export default NotFound;