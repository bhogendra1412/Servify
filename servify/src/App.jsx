import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage  from "./pages/LandingPage";
import ServicesPage from "./pages/ServicePage";
import BookingPage  from "./pages/BookingPage";
import LoginPage    from "./pages/LoginPage"; // ✅ added

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"          element={<LandingPage />}  />
        <Route path="/services"  element={<ServicesPage />} />
        <Route path="/book/:id"  element={<BookingPage />}  />
        <Route path="/login"     element={<LoginPage />}    />
      </Routes>
    </BrowserRouter>
  );
}

export default App;