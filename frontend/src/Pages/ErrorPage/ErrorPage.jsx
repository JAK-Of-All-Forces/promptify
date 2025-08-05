import NavBar from "../../Components/NavBar/NavBar";
import logo from "../../assets/favicon.png";
import { Link } from "react-router-dom";

import "./ErrorPage.css"

function ErrorPage({token, setToken}) {
    return (
      <div className="error-page">
        <NavBar token={token} setToken={setToken}></NavBar>
        <div className="error-body">
          <div className="error-message">
            {/* //Displayling NavBar component */}
            <div className="error-info">
              <h1 className="error-title">
                ERR
                <img className="logo-image" id="error-logo" src={logo}></img>R
              </h1>
              <p>Something went wrong :(</p>
              <Link to="/home">
                <button className="error-page-button">
                  <h2>Go Back Home</h2>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
}

export default ErrorPage;