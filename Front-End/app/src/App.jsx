import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar";
import Onboard from "./pages/onboarding";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Onboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
