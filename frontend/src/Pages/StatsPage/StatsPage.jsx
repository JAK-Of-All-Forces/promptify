import NavBar from "../../Components/NavBar/NavBar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
// import no_image from "../../assets/no_img.png";
import "./StatsPage.css";
// import { toast } from "react-toastify";
import ArtistStats from "../../Components/ArtistStats/ArtistStats";
import TrackStats from "../../Components/TracksStats/TrackStats";
import GenreStats from "../../Components/GenreStats/GenreStats";
import AlbumStats from "../../Components/AlbumStats/AlbumStats";

function StatsPage({ token, setToken }) {
    // const navigate = useNavigate();
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const [playlistCount, setPlaylistCount] = useState(0);
    const [profileImage, setProfileImage] = useState("");
    const [displayName, setDisplayName] = useState("");

    const spotifyId = localStorage.getItem("spotify_id");

    useEffect(() => {
        if (!spotifyId) return;
        async function fetchProfile() {
            const response = await fetch(`${API_BASE_URL}/user/profile?spotifyId=${spotifyId}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            const data = await response.json();
            setProfileImage(data.profileImage);
            setDisplayName(data.displayName);
            console.log(displayName)
            console.log(profileImage)
        }
        fetchProfile();
    }, [spotifyId]);

    useEffect(() => {
        if (!spotifyId) return;

        const fetchUserPlaylists = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/user/${spotifyId}`);
            const data = await res.json();

            if (Array.isArray(data)) {
            setPlaylistCount(data.length);
            } else {
            console.error("Unexpected playlist data format:", data);
            }
        } catch (err) {
            console.error("Error fetching playlist data:", err);
        }
        };
        fetchUserPlaylists();
    }, [spotifyId]);
    

    return (
        <>
        <NavBar token={token} setToken={setToken}></NavBar>

        <div className="stats-page-container">
            <div className="top-artists">
                <header>TOP ARTISTS</header>
                <div className="artist-block">
                    <ArtistStats></ArtistStats>
                </div>
            </div>

            <div className="top-tracks">
                <header>TOP TRACKS</header>
                <div className="track-block">
                    <TrackStats></TrackStats>
                </div>
            </div>

            <div className="top-genres">
                <header>TOP GENRES</header>
                <div className="genre-block">
                    <GenreStats></GenreStats>
                </div>
            </div>

            <div className="top-albums">
                <header>TOP ALBUMS</header>
                <div className="album-block">
                    <AlbumStats></AlbumStats>
                </div>
            </div>

            <div className="extra-display">
                <div className="profile-pic">
                    {profileImage && <img src={profileImage} alt="profile image" />}
                </div>
                <div className="welcome-message">
                    <p>WELCOME {displayName} TO YOUR STATS PAGE - DISPLAYING YOUR TOP GENRES, ARTISTS, TRACKS, AND ALBUMS ACROSS TIME</p>
                </div>
                <div className="thank-you-section">
                    {playlistCount > 0 ? (
                        <>
                        <p>THANK YOU FOR CREATING</p>
                        <p className="large-number">{playlistCount}</p>
                        <p>PROMPTIFY PLAYLISTS</p>
                        </>
                    ) : (
                        <>
                        <p className="no-playlists-message">
                            YOU HAVEN'T CREATED ANY PROMPTIFY PLAYLISTS YET</p>
                        <p>BUT THANK YOU FOR CHECKING US OUT ANYWAYS</p>
                        </>
                    )}
                </div>
            </div>
        </div>
        </>
    )

}


export default StatsPage;


