import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from '../Pages/HomePage/HomePage';
import AboutPage from '../Pages/AboutPage/AboutPage';
import LandingPage from '../Pages/LandingPage/LandingPage';
import PromptPage from '../Pages/PromptPage/PromptPage';
import PlaylistPage from '../Pages/PlaylistPage/PlaylistPage';
import ErrorPage from '../Pages/ErrorPage/ErrorPage';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={
            <ProtectedRoute token = {token}>
          <HomePage />
          </ProtectedRoute>
          } />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/prompt" element={
           <ProtectedRoute token = {token}>
              <PromptPage />
           </ProtectedRoute>
          } />
        <Route path="/playlist" element={
           <ProtectedRoute token = {token}>
          <PlaylistPage />
          </ProtectedRoute>
          } />
        <Route path="*" element={<ErrorPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
