import NavBar from "../../Components/NavBar/NavBar";
import logo from "../../assets/favicon.png";
import "./ErrorPage.css"

function ErrorPage() {
    return (
      <div className="error-page">
        {/* //Displayling NavBar component */}
        <NavBar></NavBar>
        <div className = "error-message" >
            <h1>ERR</h1>
            <img className="logo-image" src={logo}></img>
            <h1>R</h1>
        </div>

        <p>Something went wrong</p>
      </div>
    );
}

export default ErrorPage;