import "./AlbumStats.css"
import { useEffect, useState } from "react";
import loadingIcon from "../../assets/favicon.png"; 

const AlbumStats = () => {
    const spotifyId = localStorage.getItem("spotify_id");
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const [album4w, setAlbum4w] = useState([]);
    const [album6m, setAlbum6m] = useState([]);
    const [album1y, setAlbum1y] = useState([]);
    const [selectedAlbum, setSelectedAlbum] = useState([]);
    const [loading, setLoading] = useState(true);
    const [connectionError, setConnectionError] = useState(false);


    function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

  useEffect(() => {
    if (!spotifyId) return;

    async function fetchAllAlbums() {
        try {
            const urls = [
            `${API_BASE_URL}/user/top-albums/4w?spotifyId=${spotifyId}`,
            `${API_BASE_URL}/user/top-albums/6m?spotifyId=${spotifyId}`,
            `${API_BASE_URL}/user/top-albums/1y?spotifyId=${spotifyId}`,
        ];

                await delay(30000); // 30 second delay

        const res4w = await fetch(urls[0], { method: "GET", headers: { "Content-Type": "application/json" } });
        if (!res4w.ok) throw new Error("Failed to fetch 4w albums");
        const data4w = await res4w.json();
        setAlbum4w(data4w);

        await delay(30000); // 30 second delay

        const res6m = await fetch(urls[1], { method: "GET", headers: { "Content-Type": "application/json" } });
        if (!res6m.ok) throw new Error("Failed to fetch 6m albums");
        const data6m = await res6m.json();
        setAlbum6m(data6m);

        await delay(30000); // 30 second delay

        const res1y = await fetch(urls[2], { method: "GET", headers: { "Content-Type": "application/json" } });
        if (!res1y.ok) throw new Error("Failed to fetch 1y albums");
        const data1y = await res1y.json();
        setAlbum1y(data1y);

        // Initialize with 4 weeks data
        setSelectedAlbum(data4w);
        await delay(90); // let state update settle before hiding loader
        setLoading(false);
      } catch (err) {
        console.error("Error fetching albums:", err);
          console.error("Error fetching albums:", err);

        if (err.message.includes("Failed to fetch") || err.message.includes("NetworkError") || err.message.includes("ECONNREFUSED")) {
            setConnectionError(true);
        }

        setLoading(false);

      }
    }
    fetchAllAlbums();
  }, [spotifyId]);
  
    const handleTimeRangeClick = (range) => {
        if (range === "4w") { 
            console.log('just clicked 4 weeks')
            console.log(album4w)
            setSelectedAlbum(album4w)
        } else if (range === "6m") {
            console.log('just clicked 6 months')
            console.log(album6m)

            setSelectedAlbum(album6m) 
        } else if (range === "1y") { 
            console.log('just clicked 1 year')
            console.log(album1y)

            setSelectedAlbum(album1y);
        };
    }

    return (
        <div className="album-stats">

            <div className="button-options">
                <button disabled={loading} onClick={() => handleTimeRangeClick("4w")}>4 WEEKS</button>
                <button disabled={loading} onClick={() => handleTimeRangeClick("6m")}>6 MONTHS</button>
                <button disabled={loading} onClick={() => handleTimeRangeClick("1y")}>1 YEAR</button>
            </div>

            {loading ? (
                <div className="loading-container">
                    {loading && !connectionError && (
                        <>
                        <img src={loadingIcon} alt="Loading..." className="loading-spinner" />
                        <p className="loading-text">Loading...</p>
                        </>
                    )}

                    {loading && connectionError && (
                        <p className="connection-error-message">
                            We apologize, but please wait 1 minute until you reload this page.
                        </p>
                    )}
                </div>
                ) : (
                <div className="track-list">
                    {selectedAlbum.map(([albumName, tracks], index) => (
                        <div
                            key={index}
                            className="TrackCard"
                            onClick={() => {
                                if (tracks && tracks.length > 0) {
                                    const firstTrack = tracks[0];
                                    if (firstTrack?.spotifyId) {
                                        window.open(`https://open.spotify.com/track/${firstTrack.spotifyId}?go=0`, "_blank");
                                    }
                                }
                            }}
                            style={{ cursor: "pointer" }}
                        >
                            <div className="track-number">
                                {index + 1}.
                            </div>
                            <div className="track-cover">
                            <img src={tracks[0].image} alt={`${albumName} cover`} />
                        </div>
                        <div className="track-info">
                            <h3 className="track-name">{albumName}</h3>
                            <p className="track-artist">
                            {Array.isArray(tracks[0].artists) ? tracks[0].artists.join(", ") : tracks[0].artists}
                            </p>
                        </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )

}

export default AlbumStats;