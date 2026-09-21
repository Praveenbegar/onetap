import { Routes, Route, Navigate, useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import Categories from "./pages/Categories";
import CategoryResources from "./pages/CategoryResources";
import ResourceDetails from "./pages/ResourceDetails";
import SearchResults from "./pages/SearchResults";
import Latest from "./pages/Latest";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminGate from "./components/AdminGate";
import NotFound from "./pages/NotFound";

// Redirect old /details/:slug links to the new route
function LegacyDetails() {
  const { slug } = useParams();
  return <Navigate to={`/resource/${slug}`} replace />;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:category" element={<CategoryResources />} />
          <Route path="/resource/:slug" element={<ResourceDetails />} />
          <Route path="/details/:slug" element={<LegacyDetails />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/latest" element={<Latest />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<AdminGate />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
