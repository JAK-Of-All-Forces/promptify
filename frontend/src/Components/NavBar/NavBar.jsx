import "./NavBar.css";
import { Link } from "react-router-dom";



function NavBar(){
return (
  <nav className="content">
    {/* Link to homepage on click of the word Promptify*/}
    <div className="promptify-logo">
      <Link to = {`/home`}>
        <h1>Promptify</h1>
      </Link>
    </div>

    {/* Link to about us page */}
    <div className="about-us">
      <Link to={`/about`}>
        <h3>About Us</h3>
      </Link>
    </div>
  </nav>
);
}

export default NavBar;