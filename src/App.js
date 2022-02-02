import './App.css';
import React from 'react';
import Home from './home';
import FansPage from './fans-page';
import ConcertPage from './concert-page';
import { Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import HomePage from './home';

const App = () => {
  return (
    <React.Fragment className="App">
      <NavBar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/fans" element={<FansPage />} />
        <Route exact path="/concerts" element={<ConcertPage />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;
