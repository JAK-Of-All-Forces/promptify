import "./NavBar.css";
import logo from "../../assets/favicon.png";
import { useNavigate, Link } from "react-router-dom";
import { useState} from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";


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
      {/* <Link to={token ? `/home` : `/`}>
        <img className="logo-image" src={logo}></img>
      </Link> */}
      <div className="promptify-logo">
        <Link to={token ? `/home` : `/`}>
          <div className="nav-logo">
            <h1>PR</h1>
            <img className="nav-logo-image" src={logo}></img>
            <h1>MPTIFY</h1>
          </div>
        </Link>
      </div>
    </div>
    {/* Link to homepage on click of the word Promptify*/}
    <div className="right-nav">
      <div className="dropdown">

        {!activeMenu && token && (
          <div className="hamburger-icon" onClick={toggleDropdown}>
            <GiHamburgerMenu className="icon hamburger-svg fade-in" />
          </div>
        )}

  
        {activeMenu && (
          <div className="dropdown-content">
            <AiOutlineClose
              className="close-icon"
              onClick={toggleDropdown}
            />
            <div className="dropdown-item">
              <Link to="/home">
                <p>Home</p>
              </Link>
            </div>
            <div className="dropdown-item">
              <Link to="/prompt">
                <p>Make a Playlist</p>
              </Link>
            </div>
            <div className="dropdown-item">
              <Link to="/all-playlists">
                <p>All Playlists</p>
              </Link>
            </div>
            <div className="dropdown-item">
              <Link to="/stats">
                <p>Stats</p>
              </Link>
            </div>
            <div className="dropdown-item">
              <Link to="/about">
                <p>About</p>
              </Link>
            </div>
            <div className="dropdown-item">
              <Link to="/" onClick={handleLogout}>
                <p>Logout</p>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  </nav>
);
}

export default NavBar;
