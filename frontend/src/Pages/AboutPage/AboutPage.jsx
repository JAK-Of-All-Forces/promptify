import NavBar from "../../Components/NavBar/NavBar";
import "../AboutPage/AboutPage.css"; 
import aboutData from "../../data/aboutData";
import faqData from "../../data/faqData";
import { useState } from "react";
import AboutModal from "../../Components/AboutModal/AboutModal";



function AboutPage({token}) {
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [modalOpen, setModalOpen] = useState(false); 
    const [openFAQ, setOpenFAQ] = useState(false);

    const handleClose = () => {
        setModalOpen(false);
        setSelectedPerson(null); 
        };

    const toggleFAQ = (index) => {
        setOpenFAQ((prev) => ({
        ...prev,
     [index]: !prev[index]
     }));
    };


return (
  <div className="about-container">
    <NavBar token = {token}/>
    <h2 className="about-header">MEET THE TEAM</h2>
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
  {faqData.map((item, index) => (
    <div
      key={index}
      className={`faq-item ${openFAQ[index] ? "open" : ""}`}
      onClick={() => toggleFAQ(index)}
      style={{ cursor: "pointer", marginBottom: "1rem" }}
    >
      <div className="faq-question">
        <span>{item.question}</span>
<span>{openFAQ[index] ? "⌄" : "›"}</span>
      </div>
      {openFAQ[index] && <p className="faq-answer">{item.answer}</p>}
    </div>
  ))}
</div>


   {
    modalOpen && selectedPerson &&(
   <AboutModal
       onClose={handleClose}
       selectedPerson={selectedPerson}
     />
    )}
  </div>
);
}


export default AboutPage;
