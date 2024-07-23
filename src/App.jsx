import { createContext, useState, useEffect, useCallback, useMemo, useReducer } from 'react'
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

//Components
import NotFound from "./utilities/NotFound";
import Content from "./Content";
import Header from "./Header";
import About from "./About";
import Menu from './Menu';
import MobileAsideMenu from './MobileAsideMenu';

//Reducers
import { INITIAL_STATE, filtersReducer } from './reducers/filtersReducer';

//Functions
import { fetchGet } from "./functions/fetch"
import { calcStandardPrice, calcStandard } from "./functions/drinkCalcs";

export const DrinksContext = createContext();

const defaultMaxs ={
  max_BAV: 10,
  max_ML: 7500,
  max_QTY: 20
}

function App() {

  const navigate = useNavigate();
  const location = useLocation();

  const [currentSort, setCurrentSort] = useState('standardPrice');

  const [rawDrinksContent, setRawDrinksContent] = useState(null);

  const [drinksContent, setDrinksContent] = useState(null);
  const [filteredDrinks, setFilteredDrinks] = useState(null);

  const [filterMaxs, setFilterMaxs] = useState(defaultMaxs);

  const [asideActive, setAsideActive] = useState(false);

  const [currentCategory, setCurrentCategory] = useState("All");

  //Reducers
  const [filters, dispatchFilters] = useReducer(filtersReducer, INITIAL_STATE);

  //Memoized values
  const showCombos = useMemo(() =>( !(location?.pathname.includes("about") || location?.pathname === "/")), [location?.pathname]);

  const handleFilterChange = e =>{
    dispatchFilters({
        type:"CHANGE_FILTER", 
        payload:{ name: e.target.name, value:parseInt(e.target.value) }
    });
  }

  const resetFilters = () =>{
    dispatchFilters({
      type:"RESET", 
      payload: null
    });
  }

  //Applies the filters to the drinks
  useEffect(() =>{
    if(!rawDrinksContent || isNaN(filters?.minABV) || isNaN(filters?.minML)) return;
    let tempDrinks = [...rawDrinksContent];
    tempDrinks = tempDrinks.filter((drink) =>(
      drink.total_volume >= filters.minML 
      && drink.alcohol_percent >= filters.minABV
      && drink.pieces_per >= filters.minQTY
    ));
    setFilteredDrinks(tempDrinks);
  }, [rawDrinksContent, filters]);

  useEffect(() =>{
    if(!filteredDrinks) return;
      let tempDrinks = [...filteredDrinks];

      //Filter
      switch(currentSort){
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
  }, [filteredDrinks, currentSort]);

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
    }
    if(!data) return;
    resetFilters();
    console.log(filters)
    setRawDrinksContent(data.drinks);
    setFilterMaxs(data.maxStats);
    navigate('/drinks/0');
  };

  /*
    Upon page render, fetch all the drinks from backend
  */

  useEffect(async () =>{
    const fetchAll = async ()=>{
      const data = await fetchGet('get/all');
      setRawDrinksContent(data.drinks);
      setFilterMaxs(data.maxStats);
    }

    fetchAll();
  }, []);

  return (
    <div className="App col-flex-center min-h-screen bg-orange-200">
      <DrinksContext.Provider value={{drinksContent, handleCategoryChange, setCurrentSort, showCombos, asideActive, setAsideActive, currentCategory, setCurrentCategory, handleFilterChange, filters, filterMaxs}}>
        <Header />
        <Menu />
        <MobileAsideMenu />
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
