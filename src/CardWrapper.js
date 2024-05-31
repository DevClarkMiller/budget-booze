import { useNavigate } from "react-router-dom"
const CardWrapper = ({to, children, className, style, onMouseEnter, onMouseLeave, href}) =>{
    const navigate = useNavigate();
    return(
        <>

            {   href ? 
                <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}onClick={() => window.open(href, "_blank")} className={`${className} rounded-lg p-4 m-1 bg-white hover:cursor-pointer`} style={style}>
                    {children}
                </div>
                :
                to ?
                <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}onClick={() => navigate(to)} className={`${className} rounded-lg p-4 m-1 bg-white hover:cursor-pointer`} style={style}>
                    {children}
                </div>
                : 
                <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={`${className} rounded-lg p-4 m-1 bg-white`} style={style}>
                    {children}
                </div>
            }
        </>
    );
}
export default CardWrapper;