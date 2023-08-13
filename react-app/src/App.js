import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.js";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import RegistrationForm from "./pages/RegistrationForm";
import PrivateComponent from "./components/PrivateComponent";
import Search from "./pages/Search";
import AddProperty from "./pages/AddProperty";
import Portfolio from "./pages/Portfolio";
// import Gallery from "./pages/Gallery";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route element={<PrivateComponent />} />

          <Route path="/" index element={<Home />} />
          <Route path="/contact" index element={<Contact />} />
          <Route path="/register" index element={<Register />} />
          <Route path="/search" index element={<Search />} />
          <Route path="/addproperty" index element={<AddProperty />} />
          <Route path="/portfolio" index element={<Portfolio />} />
          {/* <Route path="/gallery" index element={<Gallery />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
