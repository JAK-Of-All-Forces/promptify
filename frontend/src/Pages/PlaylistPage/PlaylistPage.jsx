import NavBar from "../../Components/NavBar/NavBar";
import no_image from "../../assets/no_img.png"
import "./PlaylistPage.css";
import TrackCard from "../../Components/TrackCard/TrackCard"

function PlaylistPage(playlist) {

    function AddToSpotify(playlist) {

    }


    return (
        <div className="PlaylistPage">
        
            {/* Displayling NavBar component */}
            <NavBar></NavBar>
            {/* Playlist Page */}
            <div>
            {/* Playlist Title */}
            <h1 className="playlist-title">{playlist.title}</h1>

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
                {!playlist?.length ? (
                <div className="no-tracks">
                    <img src={no_image} alt="No tracks" />
                    <p>This Promptify playlist has no tracks</p>
                </div>
                ) : (
                playlist.track.map((track) => (
                    <TrackCard key={track.id} track={track} />
                ))
                )}
            </div>
            </div>
        </div>
        );
}

export default PlaylistPage;