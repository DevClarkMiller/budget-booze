import api from "./api";
import { createContext, useState, useEffect } from 'react'
import { Routes, Route } from "react-router-dom";
import NotFound from "./NotFound";
import Content from "./Content";
import Header from "./Header";
import { fetchGet } from "./functions/fetch"

export const DrinksContext = createContext();
function App() {
  const [unsortedDrinksContent, setUnsortedDrinksContext] = useState(null);
  const [currentSort, setCurrentSort] = useState('standardPrice');

  const [drinksContent, setDrinksContent] = useState(null);
  /*
    Upon page render, fetch all the drinks from backend
  */
  useEffect(() =>{
    const innerAsync = async() =>{
      const data = await fetchGet('get/all');
      setDrinksContent(data);
    }
    innerAsync();
  }, []);

  const calcMLPerStandard = (drink) =>{
    return 17.05 / (drink.alcohol_percent / 100)
    //return (drink.total_volume * drink.pieces_per) / calcStandard(drink);
  }

  const calcPricePerML = (drink) =>{
    return drink.price / (drink.total_volume * drink.pieces_per);
  }

  const calcStandard = (drink) =>{
    return (((drink.total_volume * drink.pieces_per) * drink.alcohol_percent) / 17.05) / 100
  }

  const calcStandardPrice = (drink) =>{
    return calcMLPerStandard(drink) * calcPricePerML(drink);
  }

  useEffect(() =>{
    if(unsortedDrinksContent){
      console.log('Now going to sort drinks')
      setDrinksContent(unsortedDrinksContent.sort((drink1, drink2) =>{
        return calcStandardPrice(drink1) - calcStandardPrice(drink2);
      }));
    }
  });

  useEffect(() =>{
    if(unsortedDrinksContent){
      console.log('Now going to sort drinks')
      setDrinksContent(unsortedDrinksContent.sort((drink1, drink2) =>{
        return calcStandardPrice(drink1) - calcStandardPrice(drink2);
      }));
    }
  }, [unsortedDrinksContent]);

  const handleCategoryChange = async (category) =>{
    let data;
    //Does a different request to change the data depending on what the category is
    switch(category){
      case "All":
        data = await fetchGet('get/all');
      break;
      case "Spirit":
        data = await fetchGet('get/spirit');
        break;
      case "BeerCider":
        data = await fetchGet('get/beerCider');
        break;
      case "Wine":
        data = await fetchGet('get/wine');
        break;
      case "Cooler":
        data = await fetchGet('get/cooler');
        break;
      default: 
      break;
    }
    setUnsortedDrinksContext(data);
  }

  

  return (
    <div className="App flex flex-col items-center min-h-full	bg-orange-200">
      <DrinksContext.Provider value={{drinksContent, handleCategoryChange}}>
        <Header />
        <Routes>
            <Route path="/*" element={<Content />}/>
            <Route path="*" element={<NotFound />}/>
        </Routes>
      </DrinksContext.Provider>
    </div>
  );
}

export default App;
