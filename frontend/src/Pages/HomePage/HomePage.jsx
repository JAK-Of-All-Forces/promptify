import NavBar from "../../Components/NavBar/NavBar";
import { URLSearchParams } from "url";
import { useState, useEffect } from "react";


function HomePage() {

    const [token, setToken] = useState(); 

    useEffect(() => {

    const queryParams = new URLSearchParams(window.location.search);
    //.search only grabs the query params at the end of a url
    const accessToken = queryParams.get("access_token");

    if(accessToken){
        
    }
       
   
  },[] );


    return (
        //Displayling NavBar component
        <NavBar></NavBar>

    );
}

export default HomePage;