import { createContext, useContext, useEffect, useState } from "react";
const BASE_URL = "http://localhost:4000";

const CitiesContext = createContext();
function CitiesProvider({children}) {
    const [cities, setCities] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [currentCity,setCurrentCity]= useState({});


  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const response = await fetch(`${BASE_URL}/cities`);
        const data = await response.json();
        setCities(data);
      } catch {
        console.log("error");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);
  return (
    <CitiesContext.Provider value={{ cities, isloading, currentCity }}>
        {children}
    </CitiesContext.Provider>
  )
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error("useCities must be used within a CitiesProvider");
  }
  return context;
}

export { useCities,CitiesProvider   };