import { Link } from "react-router-dom";
import no_image from "../../assets/no_img.png";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
// import datetime from datetime
import "./PlaylistCard.css";

function PlaylistCard({ playlist, setRefreshFlag}) {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    console.log (playlist.id);

    //Formatting the time to be in Month-DD-YYYY format
    const date_string = playlist.createdAt;
    const date = new Date(date_string)
    const formatted_date = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });

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
              <img src={playlist.image_url} alt="Playlist Cover" />
            ) : (
              <img src={no_image} alt="Playlist Cover (No Image)" />
            )}
          </div>

          {/* Displaying the Playlist Info */}
          <div className="playlist-info">
            <div className="info">
              <div className = "playlist-first-line">
                <h3 className="playlist-name">{playlist.name}</h3>
                {/* Delete icon */}
                <FaTrash className = "delete-icon" onClick={deletePlaylist} />
              </div>
              <p className="playlist-creation">Created: {formatted_date}</p>
            </div>
          </div>
        </Link>
      </div>
    );
}

export default PlaylistCard;