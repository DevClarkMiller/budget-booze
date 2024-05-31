import api from "./api";
import { createContext, useState, useEffect } from 'react'
import { Routes, Route } from "react-router-dom";
import NotFound from "./NotFound";
import Content from "./Content";
import { fetchGet } from "./functions/fetch"

export const DrinksContext = createContext();
function App() {
  const [drinksContent, setDrinksContent] = useState(null);
  /*
    Upon page render, fetch all the drinks from backend
  */
  useEffect(() =>{
    const innerAsync = async() =>{
      const data = await fetchGet('getAll');
      setDrinksContent(data);
    }
    innerAsync();
  }, [])

  return (
    <div className="App flex flex-col items-center h-screen	bg-orange-200">
      <DrinksContext.Provider value={{drinksContent}}>
        <Routes>
            <Route path="/*" element={<Content />}/>
            <Route path="*" element={<NotFound />}/>
        </Routes>
      </DrinksContext.Provider>
    </div>
  );
}

export default App;
