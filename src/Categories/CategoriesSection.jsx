//Components
import CategoriesBtn from "./CategoriesBtn";

const CategoriesSection = (props) =>{
    return(
        <div className={`categoriesSection ${props.className}`}>
            <h2 className={`font-semibold border-b border-black mb-3`}>Categories</h2>

            <ul className="flex flex-col gap-1">
                <CategoriesBtn value="All">Everything</CategoriesBtn>
                <CategoriesBtn value="Spirit">Spirits</CategoriesBtn>
                <CategoriesBtn value="BeerCider">Beers/Ciders</CategoriesBtn>
                <CategoriesBtn value="Wine">Wine</CategoriesBtn>
                <CategoriesBtn value="Cooler">Coolers</CategoriesBtn>
            </ul>
        </div>
    );
}

export default CategoriesSection;