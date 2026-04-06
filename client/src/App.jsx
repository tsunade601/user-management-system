import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home.jsx';
import FormPage from './FormPage.jsx';
import FetchPage from './FetchPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-user" element={<FormPage />} />
        <Route path="/view-user" element={<FetchPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
