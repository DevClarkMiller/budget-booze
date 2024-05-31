import { Link } from "react-router-dom";
const NotFound = () =>{
    return(
        <div className="notFound w-full h-full">
            <Link to={'/'}>Not the page you're looking for! 🍺</Link>
        </div>
    );
}

export default NotFound;