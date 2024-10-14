import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Footer from "./components/Footer";

const App = () => {
  return (
    <Router>
      <div className="App d-flex flex-column min-vh-100">
        <header></header>

        <div className="container flex-grow-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
