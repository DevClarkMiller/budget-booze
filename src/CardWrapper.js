import { useNavigate } from "react-router-dom"
const CardWrapper = ({to, children, className, style}) =>{
    const navigate = useNavigate();

    return(
        <>
            {to ?
                <div onClick={() => navigate(to)} className={`${className} rounded-lg p-4 m-1 bg-white hover:cursor-pointer`} style={style}>
                    {children}
                </div>
                : 
                <div className={`${className} rounded-lg p-4 m-1 bg-white`} style={style}>
                    {children}
                </div>
            }
        </>
    );
}
export default CardWrapper;