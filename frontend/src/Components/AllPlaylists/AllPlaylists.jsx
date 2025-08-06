import PlaylistCard from "../PlaylistCard/PlaylistCard";
import no_image from "../../assets/no_img.png";
import "./AllPlaylists.css";

function AllPlaylists({ userPlaylists = [], setRefreshFlag }) {
  return (
    <div className="content">
      {/* Mapping through all of the users' playlists if there are any */}
      <div className="all-playlists">
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
              setRefreshFlag={setRefreshFlag}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default AllPlaylists;