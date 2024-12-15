import { useState } from 'react'
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Episodes from './pages/Episodes/Episodes';
import EpisodesDetails from './pages/EpisodesDetails/EpisodesDetails';
import Characters from './pages/Characters/Characters';
import CharacterDetails from './pages/CharactersDetails';
import './App.css'

function App() {
  return (
    <>

      <Navbar />
      <Routes>
        <Route path="" element={<Navigate to="/episodes" />} />
        <Route path="/episodes" element={<Episodes />} />
        <Route path="/episodes/:id" element={<EpisodesDetails />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/characters/:id" element={<CharacterDetails />} />
      </Routes>
    </>
  )
}

export default App
