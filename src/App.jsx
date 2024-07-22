import { createContext, useState, useEffect, useCallback, useMemo, useContext } from 'react'
import { Routes, Route, useLocation } from "react-router-dom";

//Components
import NotFound from "./utilities/NotFound";
import Content from "./Content";
import Header from "./Header";
import About from "./About";
import Menu from './Menu';

//Functions
import { fetchGet } from "./functions/fetch"
import { calcStandardPrice, calcStandard } from "./functions/drinkCalcs";

export const DrinksContext = createContext();
function App() {
  const location = useLocation();

  const [currentSort, setCurrentSort] = useState('standardPrice');

  const [rawDrinksContent, setRawDrinksContent] = useState(null);
  const [drinksContent, setDrinksContent] = useState(null);

  const [asideActive, setAsideActive] = useState(false);

  const [currentCategory, setCurrentCategory] = useState("All");

  //Memoized values
  const showCombos = useMemo(() =>( !(location?.pathname.includes("about") || location?.pathname === "/")), [location?.pathname]);

  //Memoized functions
  const sortDrinks = useCallback((sortName) =>{
    if(!rawDrinksContent) return;
      let tempDrinks = [...rawDrinksContent];

      switch(sortName){
        case "standardPrice":
          tempDrinks.sort((drink1, drink2) =>{ return calcStandardPrice(drink1) - calcStandardPrice(drink2)});
          break;
        case "totalPrice":
          tempDrinks.sort((drink1, drink2) =>{ return drink1.price - drink2.price});
          break;
        case "standardQty":
          tempDrinks.sort((drink1, drink2) =>{ return calcStandard(drink2) - calcStandard(drink1)});
          break;
        default:
          tempDrinks.sort((drink1, drink2) =>{ return calcStandardPrice(drink1) - calcStandardPrice(drink2)});
          break;
      }
    setDrinksContent(tempDrinks);
  }, [rawDrinksContent]);

  const handleCategoryChange = useCallback(async (category) =>{
    let data;
    //Does a different request to change the data depending on what the category is
    switch(category){
      case "All":
        data = await fetchGet('/get/all');
      break;
      case "Spirit":
        data = await fetchGet('/get/spirit');
        break;
      case "BeerCider":
        data = await fetchGet('/get/beerCider');
        break;
      case "Wine":
        data = await fetchGet('/get/wine');
        break;
      case "Cooler":
        data = await fetchGet('/get/cooler');
        break;
      default: 
      break;
    }
    setRawDrinksContent(data);
  }, []);

  /*
    Upon page render, fetch all the drinks from backend
  */
    
  useEffect(async () =>{
    const data = await fetchGet('get/all');
    setRawDrinksContent(data);
  }, []);

  
  useEffect(() =>{ sortDrinks(currentSort); }, [rawDrinksContent, currentSort]);

  return (
    <div className="App col-flex-center min-h-screen bg-orange-200">
      <DrinksContext.Provider value={{drinksContent, handleCategoryChange, setCurrentSort, showCombos, asideActive, setAsideActive, currentCategory, setCurrentCategory}}>
        <Header />
        <Menu />
        <Routes>
            <Route path="/*" element={<Content />}/>
            <Route path="/about" element={<About />}/>
            <Route path="*" element={<NotFound />}/>
        </Routes>
      </DrinksContext.Provider>
    </div>
  );
}

export default App;
