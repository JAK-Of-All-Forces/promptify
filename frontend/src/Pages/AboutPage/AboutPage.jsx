import NavBar from "../../Components/NavBar/NavBar";
import blueCard from "../../assets/blueAboutCard.png";
import purpleCard from "../../assets/purpleAboutCard.png";
import greenCard from "../../assets/greenAboutCard.png";
import "../AboutPage/AboutPage.css"; 

function AboutPage() {
    
    return (
        <div className="about-container">
            <NavBar />
            <div className="aboutCard-container">
                <img src={blueCard} alt="Blue About Card" className="aboutCard" />
                <img src={purpleCard} alt="Purple About Card" className="aboutCard" />
                <img src={greenCard} alt="Green About Card" className="aboutCard" />
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
