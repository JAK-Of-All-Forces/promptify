import axios from "axios";
import "./LoginButton.css";

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
    <button className="login-button" onClick={handleLoginClick}>
      Login
    </button>
  );
}

export default LoginButton;
