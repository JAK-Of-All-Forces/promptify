import NavBar from "../../Components/NavBar/NavBar";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PreviousPlaylists from "../../Components/PreviousPlaylists/PreviousPlaylists";
import LogoutButton from "../../Components/SpotifyLogout/LogoutButton";
import "./HomePage.css";

function HomePage({ token, setToken }) {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  //User playlists variable
  const [userPlaylists, setUserPlaylists] = useState([]);

  //This is for when a track is deleted so the useEffect knows to refresh everytime the refreshflag value is changed
  const [refreshFlag, setRefreshFlag] = useState(false);

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
          const refreshRes = await fetch(
            `${API_BASE_URL}/api/auth/refresh-token/${spotifyId}`
          );
          const refreshData = await refreshRes.json();

          // Store the new token and re-fetch the profile
          const newToken = refreshData.accessToken;
          localStorage.setItem("spotify_access_token", newToken);
          window.location.reload();
        } else {
          const data = await res.json();
          console.log("User profile:", data);

          //Calling for previous playlists
          const playlistRes = await fetch(`${API_BASE_URL}/user/${data.id}`);

          const playlistData = await playlistRes.json();
          console.log("Playlist data", playlistData);

          setUserPlaylists(playlistData);

          //Checking where the token is stored
          console.log("Token", token);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, [token, refreshFlag]);

  return (
    //Displayling NavBar component
    <div className="home-page">
      <NavBar
      token={token}
      setToken={setToken}>
      </NavBar>
   

      {/* Rest of the home page content below */}

      <div className="button-container">
        <Link to="/prompt">
          <button className="home-page-button">
            <h2>Let's Make a Playlist</h2>
          </button>
        </Link>
      </div>

      <div>
        <PreviousPlaylists
          userPlaylists={userPlaylists}
          setRefreshFlag={setRefreshFlag}
        />
      </div>
    </div>
  );
}

export default HomePage;
