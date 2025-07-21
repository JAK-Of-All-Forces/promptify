


function LogoutButton({setToken}){

const handleLogout = () => {
  //clear access token takes the user back to landing page 
  localStorage.removeItem("spotify_access_token");
  setToken(null);
  window.location.href = "/"; 
};

     return(
        <i className="logout-button" onClick={handleLogout}>
             Logout
            </i>
    ); 
}

export default LogoutButton; 
