import NavBar from "../../Components/NavBar/NavBar";
import blueCard from "../../assets/blueAboutCard.png";
import purpleCard from "../../assets/purpleAboutCard.png";
import greenCard from "../../assets/greenAboutCard.png";
import "../AboutPage/AboutPage.css"; 
import aboutData from "../../data/aboutData";
import { useState, useEffect } from "react";



function AboutPage() {
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [modalOpen, setModalOpen] = useState(false); 

return (
  <div className="about-container">
    <NavBar />
    <div className="aboutCard-container">
      {aboutData.map((person) => (
        <img
          key={person.id}
          src={person.image}
          alt={person.name}
          className="aboutCard"
          onClick={() => {
            setSelectedPerson(person);
            setModalOpen(true);
          }}
        />
      ))}
    </div>

    <div className="faq-container">
      <h2>Frequently Asked Questions</h2>
      <ul>
        <li>How does Promptify work?</li>
        <li>Is my data secure?</li>
        <li>Can I customize my playlists?</li>
        <li>Do I need a premium Spotify account?</li>
      </ul>
    </div>
  </div>
);
}


export default AboutPage;
