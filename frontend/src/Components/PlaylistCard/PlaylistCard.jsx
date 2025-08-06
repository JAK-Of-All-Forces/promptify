import { Link } from "react-router-dom";
import { useState } from "react";
import no_image from "../../assets/no_img.png";
import { FaTrash } from "react-icons/fa";
import DeletePlaylistModal from "../DeletePlaylistModal/DeletePlaylistModal";
import "./PlaylistCard.css";

function PlaylistCard({ playlist, setRefreshFlag }) {
  //Formatting the time to be in Month-DD-YYYY format
  const date_string = playlist.createdAt;
  const date = new Date(date_string);
  const formatted_date = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  //Modal work
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleClose = () => {
    setModalOpen(false);
    setSelectedPlaylist(null);
  };

  return (
    <div className="PlaylistCard">
      <Link to={`/playlist/${playlist.id}`}>
        {/* Playlist cover */}
        <div className="playlist-cover">
          {playlist.image_url !== "backend/assets/no_img.png" ? (
            <img src={playlist.image_url} alt="Playlist Cover" />
          ) : (
            <img src={no_image} alt="Playlist Cover (No Image)" />
          )}
        </div>

        {/* Displaying the Playlist Info */}
        <div className="playlist-info">
          <div className="info">
            <div className="playlist-first-line">
              <h3 className="playlist-name">{playlist.name}</h3>
              {/* Delete icon */}
              <FaTrash
                className="delete-icon"
                key={playlist.id}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedPlaylist(playlist);
                  setModalOpen(true);
                }}
              />
            </div>
            <p className="playlist-creation">Created: {formatted_date}</p>
          </div>
        </div>
      </Link>

      {modalOpen && selectedPlaylist && (
        <DeletePlaylistModal
          onClose={handleClose}
          selectedPlaylist={selectedPlaylist}
          setRefreshFlag={setRefreshFlag}
        />
      )}
    </div>
  );
}

export default PlaylistCard;