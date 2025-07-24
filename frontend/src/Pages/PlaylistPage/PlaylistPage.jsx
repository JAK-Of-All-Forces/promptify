import NavBar from "../../Components/NavBar/NavBar";
import { useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import no_image from "../../assets/no_img.png"
import "./PlaylistPage.css";
import TrackCard from "../../Components/TrackCard/TrackCard"

function PlaylistPage({token, setToken}) {

    const {id} = useParams();
    const [playlist, setPlaylist] = useState(null);
    console.log("Token (Playlist Page)", token);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


    //Fetching the playlist using the id from the url
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
    
    //Add to Spotify function
    async function AddToSpotify(playlist) {
        console.log ("Spotify Playlist", playlist);

        //If there is no token upon hitting this page, it will show that the user is not logged in as an alert
        if (!token) {
            return null; 
        }

        try{
            //As the user is logged in up to this point, it will do an API call to the user's playlists on Spotify and do a post request for the playlist
            const addPlaylistRes = await fetch(
                `https://api.spotify.com/v1/me/playlists`,
                {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: playlist.name,
                    description: "Created with Promptify",
                    public: false,
                }),
                }
            );

            //Error handeling for the creating response
            if (!addPlaylistRes.ok) {
                const errorData = await addPlaylistRes.json();
                throw new Error(
                `Spotify playlist creation failed: ${errorData.error.message}`
                );
            }

            const createdPlaylist = await addPlaylistRes.json();

            //Error handling for the created playlist id
            if (!createdPlaylist.id) {
                throw new Error("Created playlist ID is missing");
            }


            //Track URIs are required by the the Spotify API to add tracks to playlists
            //As Promptify fetches the Spotify IDs and not URIs we have to convert it to the correct format when mapping through the playlist's tracks
            const trackURIs = (playlist.tracks || []).map(
                (track) => `spotify:track:${track.spotifyId}`
            );

            //The Spotify API does not accept this call if there are no tracks available so we have to have a conditional for the track length
            if (playlist.tracks.length > 0) {
                const addTracksRes = await fetch(
                `https://api.spotify.com/v1/playlists/${createdPlaylist.id}/tracks`,
                {
                    method: "POST",
                    headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ uris: trackURIs }),
                }
                );

                //Error handling for adding tracks
                if (!addTracksRes.ok) {
                const errorData = await addTracksRes.json();
                throw new Error(
                    `Failed to add tracks: ${errorData.error.message}`
                );
                }
            }

            alert("Playlist added to Spotify!");

            } catch (err) {
            console.error("Error adding to Spotify:", err);
            alert("Failed to add playlist to Spotify.");
        }
        }








    if (!playlist) {
        return <div className="PlaylistPage">Loading...</div>;
    }

    return (
      <div className="playlist-page">
        {/* Displayling NavBar component */}
        <NavBar></NavBar>
        {/* Playlist Page */}
        <div>
          {/* Playlist Title */}
          <h1 className="playlist-title">{playlist.name}</h1>

          {/* Add to Spotify Button */}
          <div className="button-container">
            <button
              className="add-to-spotify-button"
              onClick={() => AddToSpotify(playlist)}
            >
              <h2>+ Add to Spotify</h2>
            </button>
          </div>
          <div className="playlist-content">
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
              {!playlist.tracks || playlist.tracks.length === 0 ? (
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
      </div>
    );
}

export default PlaylistPage;