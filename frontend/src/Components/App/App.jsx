import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from "react";

import HomePage from "../../Pages/HomePage/HomePage.jsx";
import AboutPage from "../../Pages/AboutPage/AboutPage";
import LandingPage from "../../Pages/LandingPage/LandingPage";
import PromptPage from "../../Pages/PromptPage/PromptPage";
import PlaylistPage from "../../Pages/PlaylistPage/PlaylistPage";
import ErrorPage from "../../Pages/ErrorPage/ErrorPage";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const [token, setToken] = useState();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    //.search only grabs the query params at the end of a url
    const accessToken = queryParams.get("access_token");

    if (accessToken) {
      setToken(accessToken);
      localStorage.setItem("spotify_access_token", accessToken);

      const spotifyId = queryParams.get("spotify_id");

      if (spotifyId) {
        localStorage.setItem("spotify_id", spotifyId);
      }
    } else {
      // if an accessToken does not exist on the query after a page refresh, check if the localStorage already has one and restore it
      //user will stay logged in after a page refresh
      const storedToken = localStorage.getItem("spotify_access_token");
      if (storedToken) {
        setToken(storedToken);
      }
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute token={token}>
              <HomePage token={token} />
            </ProtectedRoute>
          }
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/prompt" element={<PromptPage />} />
        <Route path="/playlist" element={<PlaylistPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
