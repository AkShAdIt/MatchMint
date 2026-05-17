import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { AuthPage } from './pages/AuthPage';
import { RegisterRolePage } from './pages/RegisterRolePage';
import { TournamentSelectPage } from './pages/TournamentSelectPage';
import { PlayerRegistrationPage } from './pages/PlayerRegistrationPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<RegisterRolePage />} />
        <Route path="/register/tournament" element={<TournamentSelectPage />} />
        <Route path="/register/player" element={<PlayerRegistrationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
