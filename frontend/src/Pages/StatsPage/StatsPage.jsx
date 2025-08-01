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
    const [profileImage, setProfileImage] = useState("");
    const [displayName, setDisplayName] = useState("");

    useEffect(() => {
        async function fetchProfile() {
            const spotifyId = localStorage.getItem("spotify_id");
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
    }, []);



    return (
        <>
        <NavBar token={token} setToken={setToken}></NavBar>

        <div className="top-artists">
            <header>TOP ARTISTS</header>
            <div className="button-options">
                <button>4 WEEKS</button>
                <button>6 MONTHS</button>
                <button>1 YEAR</button>
            </div>
            <ArtistStats></ArtistStats>
        </div>

        <div className="top-tracks">
            <header>TOP TRACKS</header>
            <div className="button-options">
                <button>4 WEEKS</button>
                <button>6 MONTHS</button>
                <button>1 YEAR</button>
            </div>
            <TrackStats></TrackStats>
        </div>

        <div className="top-genres">
            <header>TOP GENRES</header>
            <div className="button-options">
                <button>4 WEEKS</button>
                <button>6 MONTHS</button>
                <button>1 YEAR</button>
            </div>
            <GenreStats></GenreStats>
        </div>

        <div className="top-albums">
            <header>TOP ALBUMS</header>
            <div className="button-options">
                <button>4 WEEKS</button>
                <button>6 MONTH</button>
                <button>1 YEAR</button>
            </div>
            <AlbumStats></AlbumStats>
        </div>

        <div className="extra-display">
            <div className="profile-pic">
                <img src={profileImage} alt="Profile" />
            </div>
            <div className="welcome-message">
                <p>WELCOME ${displayName} TO YOUR STATS PAGE - DISPLAYING YOUR TOP GENRES, ARTISTS, TRACKS, AND ALBUMS ACROSS TIME</p>
            </div>
            <div className="thank-you-section">
                <p>THANK YOU FOR CREATING</p>
                <p className="large-number">[number]</p>
                <p>PROMPTIFY PLAYLISTS</p>
            </div>
        </div>



        </>
    )

}


export default StatsPage;


