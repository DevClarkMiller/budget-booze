import { useContext, useMemo } from "react";

//Context
import { DrinksContext } from "../App";

const CategoriesBtn = (props) =>{
    const {handleCategoryChange, currentCategory, setCurrentCategory} = useContext(DrinksContext);

    const isActive = useMemo(() => currentCategory === props.value, [currentCategory])

    const handleClick = () =>{
        setCurrentCategory(props.value);
        handleCategoryChange(props.value)
    }
    
    return(
        <li><button className={`nice-trans ${isActive&&"text-appleBlue"}`} onClick={handleClick}>{props.children}</button></li>
    );
}

export default CategoriesBtn;