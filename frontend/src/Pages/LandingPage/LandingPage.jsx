import { Link } from "react-router-dom";
import {useEffect, useRef} from "react";
import logo from "../../assets/favicon.png";


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
          <div className="landing-page">
            <nav>
              <div className="about-us">
                <Link to={`/about`}>
                  <h3>About Us</h3>
                </Link>
              </div>
            </nav>
            <div className="info">
              <div className="container-left">
                <div className="promptify-logo">
                  <h1 className="promptify-title">PR
                  <img className="logo-image" src={logo}></img>
                  MPTIFY</h1>
                </div>
                {/* <p>Please log in with Spotify to get started.</p> */}
                <video
                  ref={videoRef}
                  className="video"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src={video}></source>
                </video>
              </div>
              <div className="container-right">
                <LoginButton />
              </div>
            </div>
            {/*  */}

            {/* Rest of the landing page content below */}
          </div>
        );
}

export default LandingPage;

