import { createContext, useCallback, useContext, useEffect, useReducer } from "react";
const BASE_URL = "http://localhost:4000";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isloading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isloading: true,
      };
    case "cities/loaded":
      return {
        ...state,
        isloading: false,
        cities: action.payload,
      };

    case "city/loaded":
      return {
        ...state,
        isloading: false,
        currentCity: action.payload,
      };

    case "city/created":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
        isloading: false,
      };

    case "city/deleted":
      return {
        ...state,
        isloading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };
    case "rejected":
      return {
        ...state,
        isloading: false,
        error: action.payload,
      };

    default:
      throw new Error("Unkonwn action type");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isloading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const response = await fetch(`${BASE_URL}/cities`);
        const data = await response.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading cities",
        });
      }
    }
    fetchCities();
  }, []);

  const getCity = useCallback( async function getCity(id) {
    dispatch({ type: "loading" });
   if(Number(id) === currentCity.id) return;
    try {
      const response = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await response.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error loading city",
      });
    }
  },[currentCity.id]);

  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const response = await fetch(`${BASE_URL}/cities/`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error creating city",
      });
    }
  }
  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting city",
      });
    }
  }
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isloading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error("useCities must be used within a CitiesProvider");
  }
  return context;
}

export { useCities, CitiesProvider };
