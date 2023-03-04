import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Blogs from "./pages/Blogs";
import Explore from "./pages/Explore";
import Home from "./pages/Home";
import Tours from "./pages/Tours";
import Info from "./pages/Info";
import { createContext, useState } from "react";
import Schedule from "./components/Schedule";
import TravMates from "./components/TravMates";
import TouristAttraction from "./components/TouristAttraction";

const Appstate = createContext();

function App() {
  const [login,setLogin] = useState(false);
  
  return (
    <Router>
      <Navbar />
      
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/schedule/:id" element={<Schedule />} />
        <Route path="/travmates/:id" element={<TravMates />} />
        <Route path="/attraction/:id" element={<TouristAttraction />} />
        <Route path="/userinfo" element={<Info />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
