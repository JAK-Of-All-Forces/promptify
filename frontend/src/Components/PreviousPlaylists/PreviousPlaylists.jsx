import PlaylistCard from "../PlaylistCard/PlaylistCard";
import no_image from "../../assets/no_img.png"
import "./PreviousPlaylist.css";


function PreviousPlaylists({ userPlaylists = []}){

    console.log("Previous playlist" , userPlaylists)
    return (
        <div className="content">
            <div className="header">
                <h2>Your Promptify Playlists</h2>
            </div>
            {/* Mapping through all of the previous playlists if there are any */}
            <div className="previous-playlists">
                {!userPlaylists?.length ? (
                    <div className="playlist">

                        <img src={no_image} alt="No Promptify Playlists Have Been Made" />
                        <p>No Promptify Playlists Have Been Made</p>
                        
                    </div>
                ) : (
                    userPlaylists.map((playlist) => (
                        <PlaylistCard
                        key={playlist.id}
                        playlist={playlist}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default PreviousPlaylists;