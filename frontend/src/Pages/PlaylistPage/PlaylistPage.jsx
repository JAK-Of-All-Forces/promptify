import NavBar from "../../Components/NavBar/NavBar";
import { useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import no_image from "../../assets/no_img.png"
import "./PlaylistPage.css";
import TrackCard from "../../Components/TrackCard/TrackCard"

function PlaylistPage() {

    const {id} = useParams();
    const [playlist, setPlaylist] = useState(null);
    const token = localStorage.getItem("spotify_access_token");
    console.log("Token (Playlist Page)", token);

    useEffect(() => {
        const fetchPlaylist = async () => {
            try {
                const res = await fetch(`http://localhost:3001/playlist/${id}`);
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
    





    //Add to Spotify button
    async function AddToSpotify(playlist) {
        console.log ("Spotify Playlist", playlist);
        //Getting the user's Spotify token (this can also be brought in from the user data)
        //const token = localStorage.getItem("spotifyAccessToken");
      
        //If they do not have a token, it will show that the user is not logged in
        if (!token) {
            alert("User is not logged in")
        }

        try{
        //We can fetch the user information whihc is already stored in the home page. All we would have to do is pass that in.
        const userRes = await fetch("https://api.spotify.com/v1/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = await userRes.json();

        //Fetching the user data

        const createRes = await fetch(
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
        if (!createRes.ok) {
          const errorData = await createRes.json();
          throw new Error(
            `Spotify playlist creation failed: ${errorData.error.message}`
          );
        }
        const createdPlaylist = await createRes.json();


        //Error handling for the created playlist id
        if (!createdPlaylist.id) {
          throw new Error("Created playlist ID is missing");
        }

        //Track URIs are required by the the Spotify API to add tracks to playlists
        //As this application fetches the Spotify IDs and not URIs we have to convert it to the correct format when mapping through the playlist's tracks
        const trackUris = (playlist.tracks || []).map(track => `spotify:track:${track.id}`);
        const addTracksRes = await fetch(`https://api.spotify.com/v1/playlists/${createdPlaylist.id}/tracks`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ uris: trackUris })
        });
    
        //Error handling for adding tracks
        if (!addTracksRes.ok) {
          const errorData = await addTracksRes.json();
          throw new Error(`Failed to add tracks: ${errorData.error.message}`);
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
        <div className="PlaylistPage">
        
            {/* Displayling NavBar component */}
            <NavBar></NavBar>
            {/* Playlist Page */}
            <div>
            {/* Playlist Title */}
            <h1 className="playlist-title">{playlist.name}</h1>

            {/* Add to Spotify Button */}
            <button onClick = {() => AddToSpotify(playlist)}>Add to Spotify</button>

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