import { createContext, useState, useEffect, useCallback } from 'react'
import { Routes, Route } from "react-router-dom";

//Components
import NotFound from "./utilities/NotFound";
import Content from "./Content";
import Header from "./Header";
import About from "./About";

//Functions
import { fetchGet } from "./functions/fetch"
import { calcStandardPrice, calcStandard } from "./functions/drinkCalcs";

export const DrinksContext = createContext();
function App() {
  const [currentSort, setCurrentSort] = useState('standardPrice');

  const [rawDrinksContent, setRawDrinksContent] = useState(null);
  const [drinksContent, setDrinksContent] = useState(null);
  const [showCombos, setShowCombos] = useState(false);

  //Memoized functions
  const sortDrinks = useCallback((sortName) =>{
    if(rawDrinksContent){
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
    }
  }, [rawDrinksContent]);

  /*
    Upon page render, fetch all the drinks from backend
  */
    
  useEffect(async () =>{
    const data = await fetchGet('get/all');
    setRawDrinksContent(data);
  }, []);

  
  useEffect(() =>{ sortDrinks(currentSort); }, [rawDrinksContent, currentSort]);

  // useEffect(() =>{ sortDrinks(currentSort); }, [currentSort]);


  const handleCategoryChange = async (category) =>{
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
  }

  return (
    <div className="App flex flex-col items-center min-h-screen	bg-orange-200">
      <DrinksContext.Provider value={{drinksContent, handleCategoryChange, setShowCombos}}>
        <Header setCurrentSort={setCurrentSort} showCombos={showCombos} setShowCombos={setShowCombos}/>
        <Routes>
            <Route path="/*" element={<Content />}/>
            <Route path="/about" element={<About setShowCombos={setShowCombos} />}/>
            <Route path="*" element={<NotFound />}/>
        </Routes>
      </DrinksContext.Provider>
    </div>
  );
}

export default App;
