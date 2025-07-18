import { Link } from "react-router-dom";
import LoginButton from "../../Components/SpotifyLoginOauth/LoginButton";
import "./LandingPage.css"

function LandingPage() {
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

            {/* Rest of the landing page content below */}
        </div>
    );
}

export default LandingPage;

