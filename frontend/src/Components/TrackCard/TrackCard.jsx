//import { Link } from "react-router-dom";
import no_image from "../../assets/no_img.png";
import "./TrackCard.css";

function TrackCard({ track }) {
  return (
    <div
      className="TrackCard"
      onClick={() => window.open(`https://open.spotify.com/track/${track.spotifyId}`)}
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
    </div>
  );
}

export default TrackCard;