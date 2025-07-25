import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from "react";
import HomePage from "../../Pages/HomePage/HomePage.jsx";
import AboutPage from "../../Pages/AboutPage/AboutPage";
import LandingPage from "../../Pages/LandingPage/LandingPage";
import PromptPage from "../../Pages/PromptPage/PromptPage";
import PlaylistPage from "../../Pages/PlaylistPage/PlaylistPage";
import ErrorPage from "../../Pages/ErrorPage/ErrorPage";
import LoadingPage from "../../Pages/LoadingPage/LoadingPage";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
      const [token, setToken] = useState(undefined); 
      const [showModal,setShowModal] = useState(false); 
      const [selectedPerson, setSelectedPerson] = useState(null); 

    useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    //.search only grabs the query params at the end of a url
    const accessToken = queryParams.get("access_token");
    const spotifyId = queryParams.get("spotify_id")


    if(accessToken){
        setToken(accessToken);
        localStorage.setItem("spotify_access_token", accessToken); 

        
        if(spotifyId){
            localStorage.setItem("spotify_id", spotifyId); 
        }
    }else{

        // if an accessToken does not exist on the query after a page refresh, check if the localStorage already has one and restore it 
        //user will stay logged in after a page refresh
     const storedToken = localStorage.getItem("spotify_access_token");
     if (storedToken){ 
        setToken(storedToken);
     }else{
      setToken(null); 
     }

    }
   
  },[] );

  if (token === undefined) {
  // return null 
    return <div>Loading...</div>; // or a loading spinner
}

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute token={token}>
              <HomePage token={token} setToken={setToken} />
            </ProtectedRoute>
          }
        />
        <Route path="/about" element={<AboutPage token={token} />} />
        <Route 
          path="/prompt" 
          element={
          <ProtectedRoute token={token}>
          <PromptPage  token = {token} setToken={setToken}/>
          </ProtectedRoute>
          } 
          />
        <Route path="/playlist/:id" element={
          <ProtectedRoute token={token}>
          <PlaylistPage token = {token} setToken={setToken}/>
          </ProtectedRoute>} 
          />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/loading" element={<LoadingPage />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}
export default App;