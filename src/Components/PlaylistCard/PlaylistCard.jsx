import { Link } from "react-router-dom";
import no_image from "../../assets/no_img.png";
import "./PlaylistCard.css";

function PlaylistCard({ playlist }) {

    return (
        <div className = "PlaylistCard">
            {/* Make sure to come back to this endpoint for the individual playlist to see if this matches up*/}
            <Link to = {`/playlist/${playlist.id}`}>
                {/* Playlist cover */}
                <div className = "playlist-cover">
                    {playlist.image_url ? (
                        <img src={playlist.image_url} alt = "Playlist cover" />
                    ) : (
                        <img src={no_image} alt="Playlist cover (no image)" />
                    )}
                </div>

                {/* Displaying the Playlist Info */}
                <div className = "playlist-info">
                    <div className = "info">
                        <p className = "playlist-name">{playlist.name}</p>
                        <p className = "playlist-creation">Created: {playlist.createdAt}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default PlaylistCard;