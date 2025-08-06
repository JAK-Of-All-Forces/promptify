import PlaylistCard from "../PlaylistCard/PlaylistCard";
import no_image from "../../assets/no_img.png";
import "./RecentPlaylists.css";

function RecentPlaylists({ userPlaylists = [], setRefreshFlag }) {
  const reversedUserPlaylists = userPlaylists.slice(0).reverse();
  const mostRecentPlaylists = reversedUserPlaylists.slice(0, 6);

  return (
    <div className="content">
      {/* Mapping through the top 6 most recent playlists if there are any */}
      <div className="recent-playlists">
        {!mostRecentPlaylists?.length ? (
          <div className="playlist">
            <img src={no_image} alt="No Promptify Playlists Have Been Made" />
            <p>No Promptify Playlists Have Been Made</p>
          </div>
        ) : (
          mostRecentPlaylists.map((playlist) => (
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

export default RecentPlaylists;