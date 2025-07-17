import NavBar from "../../Components/NavBar/NavBar";
import "../AboutPage/AboutPage.css"; 
import aboutData from "../../data/aboutData";
import { useState } from "react";



function AboutPage() {
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [modalOpen, setModalOpen] = useState(false); 

return (
  <div className="about-container">
    <NavBar />
    <div className="aboutCard-container">
      {aboutData.map((person) => (
  <div
    className="about-card"
    key={person.id}
    onClick={() => {
      setSelectedPerson(person);
      setModalOpen(true);
    }}
  >
    <img src={person.image} alt={person.name} className="card-bg" />
    <div className="card-content">
      <h3>{person.name}</h3>
      <p>{person.role}</p>
      <a href={person.linkedin} >
        LinkedIn
      </a>
    </div>
  </div>
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
