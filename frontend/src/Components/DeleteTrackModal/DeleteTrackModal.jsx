import "./DeleteTrackModal.css";
import axios from "axios";

function DeleteTrackModal({ selectedTrack, setRefreshFlag, onClose }) {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  if (!selectedTrack) return null;

  //Function for deleting track
  const deleteTrack = async (event) => {
    try {
      //Calls on the endpoint for deleting and updates the refresh flag
      await axios.delete(
        `${API_BASE_URL}/tracksOnPlaylists/${selectedTrack.trackOnPlaylistId}`
      );
      setRefreshFlag((prev) => !prev);
    } catch (err) {
      console.log("Error deleting track on playlist:", err);
    }
  };

  return (
    <div
      className="delete-modal"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onClose();
      }}
    >
      <div className="delete-modal-content">
        <div className="delete-modal-body">
          <div className="delete-content">
            <h2>Delete Track?</h2>
            <p className="message">
              This will delete
              <span className="modal-track-name">
                &nbsp;{selectedTrack.name}&nbsp;
              </span>
              from this playlist
            </p>
          </div>
          <div className="buttons">
            <button className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button className="delete-button" onClick={deleteTrack}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteTrackModal;