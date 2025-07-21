import NavBar from "../../Components/NavBar/NavBar";
import { useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import no_image from "../../assets/no_img.png"
import "./PlaylistPage.css";
import TrackCard from "../../Components/TrackCard/TrackCard"

function PlaylistPage() {

    const {id} = useParams();
    const [playlist, setPlaylist] = useState(null);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


    useEffect(() => {
        const fetchPlaylist = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/playlist/${id}`);
                const data = await res.json();
                setPlaylist(data);
            }
            catch (err) {
                console.error("Error fetching playlist: ", err);
            }
        }
        fetchPlaylist();

    }, [id]);

    console.log("Playlist", playlist);
    
    function AddToSpotify(playlist) {

    }


    if (!playlist) {
      return <div className="PlaylistPage">Loading...</div>;
    }

    return (
        <div className="PlaylistPage">
        
            {/* Displayling NavBar component */}
            <NavBar></NavBar>
            {/* Playlist Page */}
            <div>
            {/* Playlist Title */}
            <h1 className="playlist-title">{playlist.name}</h1>

            {/* Add to Spotify Button */}
            <button>Add to Spotify</button>

            {/* Playlist Cover */}
            <div className="playlist-cover">
                {playlist.image_url ? (
                <img src={playlist.image_url} alt="Playlist cover" />
                ) : (
                <img src={no_image} alt="Playlist cover (no image)" />
                )}
            </div>

            {/* Mapping through all of the playlist tracks */}
            <div className="playlist-tracks">
                {!playlist.tracks || playlist.tracks.length === 0? (
                <div className="no-tracks">
                    <img src={no_image} alt="No tracks" />
                    <p>This Promptify playlist has no tracks</p>
                </div>
                ) : (
                playlist.tracks.map((track) => (
                    <TrackCard key={track.id} track={track} />
                ))
                )}
            </div>
            </div>
        </div>
        );
}

export default PlaylistPage;