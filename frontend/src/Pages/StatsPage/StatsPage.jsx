import NavBar from "../../Components/NavBar/NavBar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import no_image from "../../assets/no_img.png";
import "./StatsPage.css";
import { toast } from "react-toastify";
import ArtistStats from "../../Components/ArtistStats/ArtistStats";
import TrackStats from "../../Components/TracksStats/TrackStats";
import GenreStats from "../../Components/GenreStats/GenreStats";
import AlbumStats from "../../Components/AlbumStats/AlbumStats";

function StatsPage({ token, setToken }) {

    return (
        <>
        <div className="nav-bar">
            <NavBar token={token} setToken={setToken}></NavBar>
        </div>
        </>
    )

}


export default StatsPage;


