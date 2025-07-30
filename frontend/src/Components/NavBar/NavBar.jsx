import "./NavBar.css";
import logo from "../../assets/favicon.png";
import { useNavigate, Link } from "react-router-dom";
<<<<<<< HEAD
import { useState} from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
=======
import { GiHamburgerMenu } from "react-icons/gi";
>>>>>>> origin


function NavBar({token, setToken}){
  const [activeMenu, setActiveMenu] = useState(false);

   function toggleDropdown(){
    setActiveMenu(!activeMenu);
  }

  const handleLogout = () => {
    //Clear access token takes the user back to landing page
    localStorage.removeItem("spotify_access_token");
    setToken(null);
    window.location.href = "/";
  };
  
return (
  <nav className="nav-bar">
    <div className="left-nav">
      <Link to={token ? `/home` : `/`}>
        <img className="logo-image" src={logo}></img>
      </Link>
<<<<<<< HEAD
=======

      {/* <img src = {logo}/> */}
>>>>>>> origin
    </div>
    {/* Link to homepage on click of the word Promptify*/}
    <div className="promptify-logo">
      <Link to={token ? `/home` : `/`}>
        <h1>PROMPTIFY</h1>
      </Link>
    </div>

    <div className="right-nav">
      <div className="dropdown">
        <div className="hamburger-icon" onClick={toggleDropdown}>
          <div className={`icon ${activeMenu ? "fade-out" : "fade-in"}`}>
            <GiHamburgerMenu />
          </div>
          <div className={`icon ${activeMenu ? "fade-in" : "fade-out"}`}>
            <AiOutlineClose />
          </div>
        </div>

        {activeMenu && (
          <div className="dropdown-content">
            <div className="dropdown-item">
              <Link to="/about">
                <p>About</p>
              </Link>
            </div>
            <div className="dropdown-item">
              <Link to="/about">
                <p>Stats Page</p>
              </Link>
            </div>
            <div className="dropdown-item">
              <Link onClick={handleLogout}>
                <p>Logout</p>
              </Link>
            </div>
          </div>
        )}
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
