import { Link } from "react-router-dom";
import {useEffect, useRef} from "react";

import LoginButton from "../../Components/SpotifyLoginOauth/LoginButton";
import video from "../../assets/search animation.mp4"
import "./LandingPage.css"

function LandingPage() {

    const videoRef = useRef (null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 2.0;
            videoRef.current.play();         
        }
        }, []);
        

        return (
        <div className="landing-container">
            <nav>
            <div className="about-us">
                <Link to={`/about`}>
                <h3>About Us</h3>
                </Link>
            </div>
            </nav>
            <div style={{ padding: "2rem" }}>
            <h1>Welcome to Promptify!</h1>
            <p>Please log in with Spotify to get started.</p>

            <LoginButton />
            </div>
            {/*  */}
            <video ref = {videoRef} className="video" autoPlay loop muted playsinline>
            <source src={video}></source>
            </video>
            {/* Rest of the landing page content below */}
        </div>
        );
}

export default LandingPage;

