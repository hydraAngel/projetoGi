/* eslint-disable jsx-a11y/heading-has-content */
import React, { useEffect, useState } from "react";
import "./App.css";
import Boletim from './Boletim'
import Navbar from './Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  
  return (
    <Router>
        <Navbar/>
        <Routes>
            {/* <Route path="/" element={<Home />}></Route> */}
            <Route path="/boletim" element={<Boletim />}></Route>
        </Routes>
    </Router>
  );
}

export default App;
