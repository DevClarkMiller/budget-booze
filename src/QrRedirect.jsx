import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//Components

const QrRedirect = () => {
    const navigate = useNavigate();

    const postNNav = async () =>{
        navigate('/');  //Navs to homepage
    };

    useEffect(() =>{
        alert("QR NAV PAGE");
    }, []);

    return (
        <div>

        </div>
    );
}

export default QrRedirect