import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage   from "./pages/LandingPage";
import ServicesPage  from "./pages/ServicePage";

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