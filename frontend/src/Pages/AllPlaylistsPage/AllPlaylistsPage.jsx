import NavBar from "../../Components/NavBar/NavBar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import no_image from "../../assets/no_img.png";
import "./AllPlaylistsPage.css";
import TrackCard from "../../Components/TrackCard/TrackCard";
import { toast } from "react-toastify";
import AllPlaylists from "../../Components/AllPlaylists/AllPlaylists";
import "../../Components/NavBar/NavBar.css";
import "../LoadingPage/LoadingPage.css";
import logo from "../../assets/favicon.png";

function AllPlaylistPage({ token, setToken }) {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [isLoading, setIsLoading] = useState(true);

  //User playlists variable
  const [userPlaylists, setUserPlaylists] = useState([]);

  //This is for when a playlist is deleted so the useEffect knows to refresh everytime the refreshflag value is changed
  const [refreshFlag, setRefreshFlag] = useState(false);

  const [playlistSearchTerm, setPlaylistSearchTerm] = useState("");

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

          //Calling for previous playlists
          const playlistRes = await fetch(`${API_BASE_URL}/user/${data.id}`);

          const playlistData = await playlistRes.json();

          setUserPlaylists(playlistData);

          setIsLoading(false);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [token, refreshFlag]);

  const filteredPlaylists = userPlaylists.filter((playlist) =>
    playlist.name.toLowerCase().includes(playlistSearchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <>
        <div className="loading-page">
          <nav className="nav-bar">
            <div className="left-nav">
              <div className="promptify-logo">
                <div className="nav-logo">
                  <h1>PR</h1>
                  <img className="nav-logo-image" src={logo}></img>
                  <h1>MPTIFY</h1>
                </div>
              </div>
            </div>
          </nav>
          <div className="center-content">
            <div className="loading-dots"></div>
            <div className="prompt-caption">
              <p>Grabbing all of your Promptify playlists for you now...</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    //Displayling NavBar component
    <div className="home-page">
      <NavBar token={token} setToken={setToken}></NavBar>

      {/* Rest of the home page content below */}

      <div>
        <div className="header">
          <h2>All Promptify Playlists</h2>
        </div>
        <div className="search-bar">
          <input
            type="text"
            className="playlist-search"
            placeholder="Search Playlists..."
            value={playlistSearchTerm}
            onChange={(e) => setPlaylistSearchTerm(e.target.value)}
          />
        </div>

        <AllPlaylists
          userPlaylists={filteredPlaylists}
          setRefreshFlag={setRefreshFlag}
        />
      </div>
    </div>
  );
}

export default AllPlaylistPage;