import "./AboutModal.css"
import React from "react"

const AboutModal = ({ selectedPerson, onClose }) => {
  if (!selectedPerson) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div
        className="modal-content"
        style={{
          backgroundImage: `url(${selectedPerson.funFacts.modalImage})`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <button onClick={onClose}>X</button>
        </div>

        <div className="modal-body">
          <div className="details">
            <h2>{selectedPerson.name}</h2>
            <div className="fun-facts">
              <p><strong>Most Listened to Song:</strong> {selectedPerson.funFacts.mostListenedSong}</p>
              <p><strong>Favorite Genre:</strong> {selectedPerson.funFacts.favoriteGenre}</p>
              <p><strong>Top Artist:</strong> {selectedPerson.funFacts.topArtist}</p>
              <p><strong>Top Album:</strong> {selectedPerson.funFacts.topAlubm}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutModal;
