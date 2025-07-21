import NavBar from "../../Components/NavBar/NavBar";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PreviousPlaylists from "../../Components/PreviousPlaylists/PreviousPlaylists";
import LogoutButton from "../../Components/SpotifyLogout/LogoutButton";
import "./HomePage.css";


function HomePage({token, setToken}) {
  const PORT = process.env.PORT

  // TEMP: Dummy playlists for testing
    const PORT = import.meta.env.PORT

  const dummyPlaylists = [
    {
      id: "1",
      name: "Energetic Gym Afrobeats",
      image_url:
        "https://i.scdn.co/image/ab67616d0000b273a0b4e05b489e5e037028b496",
      createdAt: "2025-07-17T10:00:00Z",
    },

    {
      id: "2",
      name: "Chill Walk",
      image_url:
        "https://i.scdn.co/image/ab67616d0000b2739b791593e61e77e9a1c092fa",
      createdAt: "2025-07-17T12:30:00Z",
    },
  ];


  const [userPlaylists, setUserPlaylists] = useState([]);
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
            `http://localhost:${PORT}/api/auth/refresh-token/${spotifyId}`
          );
          const refreshData = await refreshRes.json();

          // Store the new token and re-fetch the profile
          const newToken = refreshData.accessToken;
          localStorage.setItem("spotify_access_token", newToken);
          window.location.reload();
        } else {
          const data = await res.json();
          console.log("User profile:", data);

          console.log("spotify id", data.id);
          //Calling for previous playlists
          const playlistRes = await fetch(
            `http://localhost:${PORT}/user/${data.id}`
          );
          const playlistData = await playlistRes.json();
          setUserPlaylists(playlistData);
          setUserPlaylists(dummyPlaylists);

          console.log("User playlists:", userPlaylists);
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
        <LogoutButton setToken={setToken} />
      </div>

      {/* Rest of the home page content below */}

      <div>
        <PreviousPlaylists userPlaylists={userPlaylists} />
      </div>

      <div>
        <button>
          <Link to = "/prompt">
            <h1>Let's Make a Playlist</h1>
          </Link>
        </button>
      </div>
    </div>
  );
}

export default HomePage;