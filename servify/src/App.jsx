import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage   from "./components/LandingPage";
import ServicesPage  from "./components/ServicePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"        element={<LandingPage />} />
        <Route path="/services" element={<ServicesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;