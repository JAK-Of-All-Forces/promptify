import axios from "axios";
import "./LoginButton.css";


function LoginButton({}){

    const PORT = process.env.PORT

    const handleLoginClick = async ()=>{
         try {
    const { data } = await axios.get(
      `http://localhost:${PORT}/api/auth/login-url` 
    );

    //redirects the user to the spotify login page
    window.location.href = data.url;

  } catch (err) {
    console.error("Error could not redirect you to the spotify login page : ", err);
  }
    }
    return(
        <button className="login-button" onClick={handleLoginClick}>
             Login
            </button>
    ); 
}

export default LoginButton