import NavBar from "../../Components/NavBar/NavBar";
import logo from "../../assets/favicon.png";
import { Link } from "react-router-dom";
import "./NotFoundPage.css";

function NotFoundPage({ token, setToken }) {
  return (
    <div className="not-found-page">
      <NavBar token={token} setToken={setToken}></NavBar>
      <div className="not-found-body">
        <div className="not-found-message">
          {/* //Displayling NavBar component */}
          <div className="not-found-info">
            <h1 className="not-found-title">
              4<img className="logo-image" src={logo}></img>4
            </h1>
            <p>Sorry, this page was not found</p>
            <Link to="/home">
              <button className="not-found-page-button">
                <h2>Go Back Home</h2>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;