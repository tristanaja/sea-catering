import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Subscription from "./pages/Subscription";

import Testimonials from "./pages/Testimonials";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/testimonials" element={<Testimonials />} />
      </Routes>
    </>
  );
}

export default App;