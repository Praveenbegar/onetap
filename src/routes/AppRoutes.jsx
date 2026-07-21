import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Categories from "../pages/Categories";
import Latest from "../pages/Latest";
import About from "../pages/About";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";
import SearchResults from "../pages/SearchResults";

import CategoryResources from "../pages/CategoryResources";
import ResourceDetails from "../pages/ResourceDetails";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/categories" element={<Categories />} />

      <Route path="/latest" element={<Latest />} />

      <Route path="/about" element={<About />} />

      <Route path="/contact" element={<Contact />} />

      <Route path="/search" element={<SearchResults />} />

     

      <Route path="*" element={<NotFound />} />
      <Route path="/categories/:category" element={<CategoryResources />}/>
      <Route
  path="/details/:slug"
  element={<ResourceDetails />}
/>
    </Routes>
  );
}

export default AppRoutes;