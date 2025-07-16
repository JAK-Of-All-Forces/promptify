import NavBar from "../../Components/NavBar/NavBar";
import { useState, useEffect } from "react";
import LogoutButton from "../../Components/SpotifyLogout/LogoutButton"
import "./HomePage.css"


function HomePage({token, setToken}) {

  useEffect(() => {
  if (!token) return;

  const fetchProfile = async () => {
    try {
      const res = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      //checks if the access to the users data has expired
      if (res.status === 401) {
        console.log("Access token expired. Attempting to refresh.");

         // Call backend to refresh the token
        const spotifyId = localStorage.getItem("spotify_id");
        const refreshRes = await fetch(`http://localhost:3001/api/auth/refresh-token/${spotifyId}`);
        const refreshData = await refreshRes.json();

        // Store the new token and re-fetch the profile
        const newToken = refreshData.accessToken;
        localStorage.setItem("spotify_access_token", newToken);
        window.location.reload(); 
      } else {
        const data = await res.json();
        console.log("User profile:", data);
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  fetchProfile();
}, [token]);

    return (
        //Displayling NavBar component
        <div className="home-container">
                    <NavBar></NavBar>
            <div style={{ padding: "2rem" }}>
                <LogoutButton setToken={setToken}/>
            </div>

            {/* Rest of the home page content below */}
        </div>

    );
}

export default HomePage;