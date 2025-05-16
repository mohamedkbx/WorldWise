import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import { CitiesProvider } from "./context/CitiesProvider";
import { AuthProvider } from "./context/FakeAuthContext";

// pages 
// import Product from "./pages/Product";
// import HomePage from "./pages/HomePage";
// import PageNotFound from "./pages/PageNotFound";
// import AppLayout from "./pages/AppLayout";
// import Pricing from "./pages/Pricing";
// import Login from "./pages/Login";

const Product = lazy(()=> import("./pages/Product"))
const HomePage = lazy(()=> import("./pages/HomePage"))
const PageNotFound = lazy(()=> import("./pages/PageNotFound"))
const AppLayout = lazy(()=> import("./pages/AppLayout"))
const Pricing = lazy(()=> import("./pages/Pricing"))
const Login = lazy(()=> import("./pages/Login"))

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";

import ProtectedRoute from "./pages/ProtectedRoute";
import { polyfillCountryFlagEmojis } from "country-flag-emoji-polyfill";
polyfillCountryFlagEmojis();


export default function App() {
  
  

  return (
    <AuthProvider>
    <CitiesProvider>
    <BrowserRouter>
    <Suspense fallback={<SpinnerFullPage/>}>
      
    
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="app" element={
          <ProtectedRoute>

          <AppLayout />
          </ProtectedRoute>
          }>
          <Route index element={<Navigate replace to="cities" />} />
          <Route path="cities" element={<CityList />} />
          <Route path="cities/:id" element={<City />} />
          <Route path="countries" element={<CountryList  />} />
          <Route path="form" element={<Form />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
        <Route path="login" element={<Login />} />
      </Routes>
      </Suspense>
    </BrowserRouter>
    </CitiesProvider>
   
    </AuthProvider>
  );
}
