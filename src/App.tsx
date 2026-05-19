import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { AuthPage } from './pages/AuthPage';
import { RegisterRolePage } from './pages/RegisterRolePage';
import { TournamentSelectPage } from './pages/TournamentSelectPage';
import { PlayerRegistrationPage } from './pages/PlayerRegistrationPage';
import { OrganizerRegistrationPage } from './pages/OrganizerRegistrationPage';
import { OwnerRegistrationPage } from './pages/OwnerRegistrationPage';
import { TournamentPage } from './pages/TournamentPage';
import { MatchPage } from './pages/MatchPage';
import { OrganizerScoringPage } from './pages/OrganizerScoringPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<RegisterRolePage />} />
        <Route path="/register/tournament" element={<TournamentSelectPage />} />
        <Route path="/register/player" element={<PlayerRegistrationPage />} />
        <Route path="/register/organizer" element={<OrganizerRegistrationPage />} />
        <Route path="/register/owner" element={<OwnerRegistrationPage />} />
        <Route path="/tournament/:id" element={<TournamentPage />} />
        <Route path="/match/:id" element={<MatchPage />} />
        <Route path="/organizer/match/:id/score" element={<OrganizerScoringPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
