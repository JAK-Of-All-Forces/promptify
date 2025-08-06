import "./DeletePlaylistModal.css";
import axios from "axios";

function DeletePlaylistModal({ selectedPlaylist, setRefreshFlag, onClose }) {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  if (!selectedPlaylist) return null;

  //Function for deleting playlist
  const deletePlaylist = async (event) => {
    try {
      //Calls on the endpoint for deleting and updates the refresh flag
      await axios.delete(`${API_BASE_URL}/playlist/${selectedPlaylist.id}`);
      setRefreshFlag((prev) => !prev);
    } catch (err) {
      console.log("Error deleting track on playlist:", err);
    }
  };

  return (
    <div className="delete-modal" onClick={onClose}>
      <div
        className="delete-modal-content"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <div className="delete-modal-body">
          <div className="delete-content">
            <h2>Delete Promptify Playlist?</h2>
            <p className="message">
              This will delete
              <span className="modal-playlist-name">
                &nbsp;{selectedPlaylist.name}&nbsp;
              </span>
              from this playlist
            </p>
          </div>
          <div className="buttons">
            <button className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button className="delete-button" onClick={deletePlaylist}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeletePlaylistModal;