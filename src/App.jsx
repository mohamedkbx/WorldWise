import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="app" element={<AppLayout />}>
          <Route path="cities" element={<p>fuck ur city</p>} />
          <Route path="countries" element={<p>fuck ur country</p>} />
          <Route path="form" element={<p>form</p>} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
