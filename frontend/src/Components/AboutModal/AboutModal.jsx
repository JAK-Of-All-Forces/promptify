import "./AboutModal.css"
import React, {useState, useEffect} from "react"

const AboutModal = ({selectedPerson, onClose}) => {
    console.log(selectedPerson); 
   

   return(
     <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <button onClick ={onClose}>X</button>
                </div>
                <div className="modal-body">
                   {!selectedPerson || !selectedPerson.name ? (
  <p>Loading...</p>
) : (
  <div className="details">
    <h2>{selectedPerson.name}</h2>
    {selectedPerson.funFacts && (
  <div className="fun-facts">
    <p><strong>Favorite Song:</strong> {selectedPerson.funFacts.favoriteSong}</p>
    <p><strong>Favorite Genre:</strong> {selectedPerson.funFacts.favoriteGenre}</p>
    <p><strong>Favorite Emoji:</strong> {selectedPerson.funFacts.favoriteEmoji}</p>
  </div>
)}   
   
  </div>
)}
                </div>
            </div>
        </div>


    )




}
export default AboutModal 
