import { Link } from "react-router-dom";
import no_image from "../../assets/no_img.png";
import axios from "axios";
//import { FaTrash } from "react-icons/fa";
import "./PlaylistCard.css";

function PlaylistCard({ playlist, setRefreshFlag}) {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    console.log (playlist.id);
  //Function for deleting track
    const deletePlaylist = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        console.log("Are we getting here?")
        //Allows for user to only click on the delete button

        try {
        //Calls on the endpoint for deleting and updates the refresh flag
        await axios.delete(
            `${API_BASE_URL}/playlist/${playlist.id}`);
            setRefreshFlag((prev) => !prev);
            
        } catch (err) {
        console.log("Error deleting track on playlist:", err);
        }
    };
    return (
      <div className="PlaylistCard">
        {/* Make sure to come back to this endpoint for the individual playlist to see if this matches up*/}
        <Link to={`/playlist/${playlist.id}`}>
          {/* Playlist cover */}
          <div className="playlist-cover">
            {playlist.image_url ? (
              <img src={playlist.image_url} alt="Playlist cover" />
            ) : (
              <img src={no_image} alt="Playlist cover (no image)" />
            )}
          </div>

          {/* Displaying the Playlist Info */}
          <div className="playlist-info">
            <div className="info">
              <h3 className="playlist-name">{playlist.name}</h3>
              <p className="playlist-creation">Created: {playlist.createdAt}</p>
              {/* Needed to import react */}
              {/* Delete icon */}
              <button onClick={deletePlaylist}>X</button>
              {/* <FaTrash onClick = {deleteTrack} /> */}
            </div>
          </div>
        </Link>
      </div>
    );
}

export default PlaylistCard;