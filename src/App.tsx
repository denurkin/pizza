import React from "react";
import { Routes, Route } from "react-router-dom";

import "./scss/app.scss";

import Header from "./components/Header.tsx";
import Home from "./components/pages/Home.tsx";
import NotFound from "./components/pages/NotFound/index.tsx";
import Cart from "./components/pages/Cart.tsx";

function App() {
  return (
    <>
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
