import NavBar from "../../Components/NavBar/NavBar";
import logo from "../../assets/favicon.png";
import { Link } from "react-router-dom";

import "./AuthenticationPage.css";

function AuthenticationPage({ token, setToken }) {
    return (
      <div className="authentication-page">
        <NavBar token={token} setToken={setToken}></NavBar>
        <div className="authentication-body">
          <div className="authentication-message">
            {/* //Displayling NavBar component */}
            <div className="authentication-info">
              <h1 className="authentication-title">
                <span className="authorization-word">AUTHENTICATION</span>
                <span className="error-word">
                  ERR
                  <img className="logo-image" src={logo} alt="Logo" />R
                </span>
              </h1>
              <p>
                You require authentication to access Promptify. Please contact amarimay1213@gmail.com
              </p>
              <Link to="/home">
                <button className="authentication-page-button">
                  <h2>Go Back Home</h2>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
}

export default AuthenticationPage;
