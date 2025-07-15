import NavBar from "../../Components/NavBar/NavBar";
import no_image from "../../assets/no_img.png"
import "./PlaylistPage.css";

function PlaylistPage(playlist) {
    return (
        <div className = "PlaylistPage">
            {/* Displayling NavBar component */}
            <NavBar></NavBar>

            <div>

                <h1 className = "playlist-title">{playlist.title}</h1>
                <button>Add to Spotify</button>
                <div className = "playlist-cover">
                    {playlist.image_url ? (
                        <img src={playlist.image_url} alt = "Playlist cover" />
                    ) : (
                        <img src={no_image} alt="Playlist cover (no image)" />
                    )}
                </div>
                <div className = "playlist-songs">


                </div>
            </div>
        </div>
    );
}

export default PlaylistPage;