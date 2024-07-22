//Components
import CategorieBtn from "./CategoriesBtn";

const CategoriesSection = (props) =>{
    return(
        <div className={`categoriesSection ${props.className}`}>
            <h2 className={`font-semibold border-b border-black mb-3`}>Categories</h2>

            <ul className="flex flex-col gap-1">
                <CategorieBtn value="All">Everything</CategorieBtn>
                <CategorieBtn value="Spirit">Spirits</CategorieBtn>
                <CategorieBtn value="BeerCider">Beers/Ciders</CategorieBtn>
                <CategorieBtn value="Wine">Wine</CategorieBtn>
                <CategorieBtn value="Cooler">Coolers</CategorieBtn>
            </ul>
        </div>
    );
}

export default CategoriesSection;