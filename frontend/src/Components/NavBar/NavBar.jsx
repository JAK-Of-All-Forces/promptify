import "./NavBar.css";
import { useNavigate, Link } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();

  //This function checks if the user is logged in or not based off of their token 
  const handleLogoClick = () => {
    const token = localStorage.getItem("spotify_access_token");

    if (token) {
      navigate("/home");
    } else {
      navigate("/");
    }
  };

  return (
    <nav className="content">
      {/* Replace <Link> with onClick to handle redirect */}
      <div className="promptify-logo" onClick={handleLogoClick} style={{ cursor: "pointer" }}>
        <h1>Promptify</h1>
      </div>

      <div className="about-us">
        <Link to="/about">
          <h3>About Us</h3>
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
