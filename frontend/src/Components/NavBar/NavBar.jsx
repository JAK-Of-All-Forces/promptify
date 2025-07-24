import "./NavBar.css";
import { useNavigate, Link } from "react-router-dom";



function NavBar({token}){
return (
  <nav className="content">
    {/* Link to homepage on click of the word Promptify*/}
    <div className="promptify-logo">
      <Link to = {token ? `/home`: `/`}>
        <h1>PROMPTIFY</h1>
        </Link>
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
