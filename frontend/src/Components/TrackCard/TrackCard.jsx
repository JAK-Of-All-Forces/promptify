//import { Link } from "react-router-dom";
import { useState } from "react";
import no_image from "../../assets/no_img.png";
import { FaTrash } from "react-icons/fa";
import DeleteTrackModal from "../DeleteTrackModal/DeleteTrackModal";
import axios from "axios";

import "./TrackCard.css";



function TrackCard({ track, setRefreshFlag }) {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  //Modal work
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleClose = () => {
    setModalOpen(false);
    setSelectedTrack(null);
  };


  return (
    <div
      className="TrackCard"
      onClick={() =>
        window.open(`https://open.spotify.com/track/${track.spotifyId}?go=0`)
      }
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
      {/* Needed to import react */}
      {/* Delete icon */}
      <FaTrash
        className="delete-icon"
        key={track.id}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setSelectedTrack(track);
          setModalOpen(true);
        }}
      />

      {modalOpen && selectedTrack && (
        <DeleteTrackModal
          onClose={handleClose}
          selectedTrack={selectedTrack}
          setRefreshFlag={setRefreshFlag}
        />
      )}
    </div>
  );
}
export default TrackCard;