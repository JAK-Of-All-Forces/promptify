import NavBar from "../../Components/NavBar/NavBar";
import { useState, useEffect } from "react";


function HomePage() {

    const [token, setToken] = useState(); 

    //Capture the token once the page loads
    useEffect(() => {

    const queryParams = new URLSearchParams(window.location.search);
    //.search only grabs the query params at the end of a url
    const accessToken = queryParams.get("access_token");

    if(accessToken){
        setToken(accessToken);
        localStorage.setItem("spotify_access_token", accessToken); 

        const spotifyId = queryParams.get("spotify_id")
        
        if(spotifyId){
            localStorage.setItem("spotify_id", spotifyId); 
        }
    }else{

        // if an accessToken does not exist on the query after a page refresh, check if the localStorage already has one and restore it 
        //user will stay logged in after a page refresh
     const storedToken = localStorage.getItem("spotify_access_token");
     if (storedToken){ 
        setToken(storedToken);
     }

    }
   
  },[] );


  //Grabs the users given informartion from the token and refreshes their information 
    useEffect(() => {
        if (!token){ 
            return;
        }

        const fetchProfile = async () => {
             try {
                 const res = await fetch("https://api.spotify.com/v1/me", {
                     headers: {
                        Authorization: `Bearer ${token}`,
                                },
                });
        //checks if the access to the users data has expired
          if (res.status === 401) {
         console.log("Access token expired. Attempting to refresh.");

         // Call backend to refresh the token
            const spotifyId = "yourSpotifyUserId"; 
            const refreshRes = await fetch(`http://localhost:3001/api/auth/refresh-token/${spotifyId}`);
            const refreshData = await refreshRes.json();

            // Store the new token and re-fetch the profile
            const newToken = refreshData.accessToken;
            localStorage.setItem("spotify_access_token", newToken);
            setToken(newToken); 

         } else {
            const data = await res.json();
            console.log("User profile:", data);
         }

     } catch (err) {
        console.error("Error fetching profile:", err);
     }
     };

    fetchProfile();
    }, [token]);





    return (
        //Displayling NavBar component
        <NavBar></NavBar>

    );
}

export default HomePage;