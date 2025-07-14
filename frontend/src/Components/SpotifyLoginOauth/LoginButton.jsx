import axios from "axios";
import "./LoginButton.css";

function LoginButton({}){

    const handleLoginClick = async ()=>{
         try {
    const { data } = await axios.get(
      `http://localhost:3001/api/auth/login-url` 
    );

    //redirects the user to the spotify login page
    window.location.href = data.url;

  } catch (err) {
    console.error("Error could not redirect you to the spotify login page : ", err);
  }
    }
    return(
        <i className="login-button" onClick={handleLoginClick}>
             Login
            </i>
    ); 
}

export default LoginButton