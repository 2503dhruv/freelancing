import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Category from "./pages/Category/Category";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import UploadTest from "./pages/UploadTest";

const GateConfigurator = lazy(() =>
  import("./pages/GateConfigurator/GateConfigurator")
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/configurator"
            element={
              <Suspense fallback={<div className="page-loading">Loading...</div>}>
                <GateConfigurator />
              </Suspense>
            }
          />
          <Route path="/category/:slug" element={<Category />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/upload" element={<UploadTest />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;