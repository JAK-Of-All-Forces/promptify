import axios from "axios";
import "./LoginButton.css";
import login from "../../assets/bg free login-modified.png";


function LoginButton() {
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log("BASE URL:", API_BASE_URL);



  const handleLoginClick = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/auth/login-url`);
      console.log(data)
      //redirects the user to the spotify login page
      window.location.href = data.url;
    } catch (err) {
      console.error(
        "Error could not redirect you to the spotify login page : ",
        err
      );
    }
  };
  return (
    <div>
      <img
        className="login-button"
        onClick={handleLoginClick}
        src={login}
        alt="Spinning Login button"
      />
    </div>
  );
}

export default LoginButton;
