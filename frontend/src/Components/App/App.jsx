import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../../Pages/HomePage/HomePage";
import AboutPage from "../../Pages/AboutPage/AboutPage";
import LandingPage from "../../Pages/LandingPage/LandingPage";
import PromptPage from "../../Pages/PromptPage/PromptPage";
import PlaylistPage from "../../Pages/PlaylistPage/PlaylistPage";
import ErrorPage from "../../Pages/ErrorPage/ErrorPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/prompt" element={<PromptPage />} />
        <Route path="/playlist" element={<PlaylistPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
