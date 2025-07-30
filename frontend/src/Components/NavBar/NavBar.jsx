import "./NavBar.css";
import logo from "../../assets/favicon.png";
import { useNavigate, Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";



function NavBar({token}){
return (
  <nav className="nav-bar">
    <div className="left-nav">
      <Link to={token ? `/home` : `/`}>
        <img className="logo-image" src={logo}></img>
      </Link>

      {/* <img src = {logo}/> */}
    </div>
    {/* Link to homepage on click of the word Promptify*/}
    <div className="promptify-logo">
      <Link to={token ? `/home` : `/`}>
        <h1>PROMPTIFY</h1>
      </Link>
    </div>

    <div className="right-nav">
      <div className="about-us">
        <Link to="/about">
          <h3>About Us</h3>
        </Link>
      </div>
      <div class = "dropdown">
        <GiHamburgerMenu className = "hamburger" />
        <div class="dropdown-content">
          <Link to="/about">
            <p>About</p>
          </Link>{" "}
          <Link to="/about">
            <p>About</p>
          </Link>{" "}
          <Link to="/about">
            <p>About</p>
          </Link>{" "}
        </div>
      </div>
    </div>
  </nav>
);
}

export default NavBar;
