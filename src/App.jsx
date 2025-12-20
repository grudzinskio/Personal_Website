import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom"
import { useEffect } from "react"
import { NotFound } from "./pages/NotFound"
import { Home } from "./pages/Home"
import { About } from "./pages/About"
import { Skills } from "./pages/Skills"
import { Projects } from "./pages/Projects"
import { Contact } from "./pages/Contact"
import { scrollToPosition, getLenis } from "./animations/smoothScroll"

function ScrollToTop() {
  const location = useLocation();
  
  useEffect(() => {
    // Use Lenis for smooth scroll to top on route change
    const lenis = getLenis();
    if (lenis) {
      scrollToPosition(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);
  
  return null;
}

function App() {

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
