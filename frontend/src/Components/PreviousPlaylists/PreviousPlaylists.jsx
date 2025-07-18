import PlaylistCard from "../PlaylistCard/PlaylistCard"
import no_image from "../../assets/no_img.png"
import "./PreviousPlaylists.css"

function PreviousPlaylists({ userPlaylists = []}){

    return (
        <div className="content">
            <div className="header">
                <h1>Your Promptify Playlists</h1>
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

export default PreviousPlaylists