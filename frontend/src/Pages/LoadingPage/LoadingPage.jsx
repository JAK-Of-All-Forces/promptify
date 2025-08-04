import "./LoadingPage.css";
import logo from "../../assets/favicon.png";
import "../../Components/NavBar/NavBar.css";


function LoadingPage() {

    return (
      <>
        <div className="loading-page">
        <nav className="nav-bar">
    <div className="left-nav">
      {/* <Link to={token ? `/home` : `/`}>
        <img className="logo-image" src={logo}></img>
      </Link> */}
      <div className="promptify-logo">
          <div className="nav-logo">
            <h1>PR</h1>
            <img className="nav-logo-image" src={logo}></img>
            <h1>MPTIFY</h1>
          </div>
      </div>
    </div>
    </nav>
          <div className="center-content">
            <div className="loading-dots"></div>
            <div className="prompt-caption">
              <p>Curating a Promptify playlist for you now...</p>
            </div>
          </div>
        </div>
      </>
    );
}

export default LoadingPage;

