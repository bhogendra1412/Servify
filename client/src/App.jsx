import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Booking from "./pages/Booking";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/services" element={<Home />} />
        <Route path="/booking/:id" element={<Booking />} />
      </Routes>
    </BrowserRouter>
  );
}