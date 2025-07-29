//import { Link } from "react-router-dom";
import no_image from "../../assets/no_img.png";
import axios from "axios";
import "./TrackCard.css";



function TrackCard({ track, setRefreshFlag }) {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  //Function for deleting track
  const deleteTrack = async (event) => {
    //Allows for user to only click on the delete button
    event.stopPropagation();

    try {
      //Calls on the endpoint for deleting and updates the refresh flag
      await axios.delete(`${API_BASE_URL}/tracksOnPlaylists/${track.trackOnPlaylistId}`);
      setRefreshFlag((prev) => !prev);

    } catch (err) {
      console.log("Error deleting track on playlist:", err);
    }
  };



  return (
    <div
      className="TrackCard"
      onClick={() =>
        window.open(`https://open.spotify.com/track/${track.spotifyId}?go=0`)
      }
    >
      {/* Track cover */}
      <div className="track-cover">
        {track.image_url ? (
          <img src={track.image_url} alt="Track cover" />
        ) : (
          <img src={no_image} alt="Track cover (no image)" />
        )}
      </div>
      {/* Displaying the Track Info */}
      <div className="track-info">
        <p className="track-name">{track.name}</p>
        <p className="track-artist">{track.artist}</p>
      </div>
      <p className="track-duration">{track.duration}</p>
      {/* Needed to import react */}
      {/* Delete icon */}
      <p onClick={deleteTrack}>X</p>
      {/* <FaTrash onClick = {deleteTrack} /> */}
    </div>
  );
}
export default TrackCard;