import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import AllWorkOuts from './components/AllWorkouts';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage/>} />
      <Route path='workouts' element={<AllWorkOuts></AllWorkOuts>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
