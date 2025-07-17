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
    <p>{selectedPerson.funFacts}</p>

    {/* gotta loop through this  */}
   
   
  </div>
)}
                </div>
            </div>
        </div>


    )




}
export default AboutModal 
