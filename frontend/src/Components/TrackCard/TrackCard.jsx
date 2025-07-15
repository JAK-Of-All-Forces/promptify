import { Link } from "react-router-dom";
import no_image from "../../assets/no_img.png";
import "./TrackCard.css";

function TrackCard({ track }) {
  return (
    <div className="TrackCard">
      {/* Make sure to come back to this endpoint for the individual playlist to see if this matches up*/}
      <Link to={`/${track.id}`}>
        {/* Track cover */}
        <div className="media">
          {track.image_url ? (
            <img src = {track.image_url} alt="Track cover" />
          ) : (
            <img src = {no_image} alt="Track cover (no image)" />
          )}
        </div>

        {/* Displaying the Track Info */}
        <div className = "track-info">
            <p className = "track-name">{track.name}</p>
            <p className = "track-artist">{track.artist}</p>
            <p className = "track-duration">{track.duration}</p>
        </div>
      </Link>
    </div>
  );
}

export default TrackCard;
