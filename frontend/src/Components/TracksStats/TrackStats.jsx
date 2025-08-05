import "./TrackStats.css"
import { useEffect, useState } from "react";
import loadingIcon from "../../assets/favicon.png"; 


const TrackStats = () => {
    const spotifyId = localStorage.getItem("spotify_id");
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const [tracks4w, setTracks4w] = useState([]);
    const [tracks6m, setTracks6m] = useState([]);
    const [tracks1y, setTracks1y] = useState([]);
    const [selectedTracks, setSelectedTracks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [connectionError, setConnectionError] = useState(false);


    function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

  useEffect(() => {
    if (!spotifyId) return;

    async function fetchAllTracks() {
        try {
            const urls = [
            `${API_BASE_URL}/user/top-tracks/4w?spotifyId=${spotifyId}`,
            `${API_BASE_URL}/user/top-tracks/6m?spotifyId=${spotifyId}`,
            `${API_BASE_URL}/user/top-tracks/1y?spotifyId=${spotifyId}`,
        ];
        await delay(10000); // 10 second delay


        const res4w = await fetch(urls[0], { method: "GET", headers: { "Content-Type": "application/json" } });
        if (!res4w.ok) throw new Error("Failed to fetch 4w tracks");
        const data4w = await res4w.json();
        setTracks4w(data4w);

        await delay(10000); // 10 second delay

        const res6m = await fetch(urls[1], { method: "GET", headers: { "Content-Type": "application/json" } });
        if (!res6m.ok) throw new Error("Failed to fetch 6m tracks");
        const data6m = await res6m.json();
        setTracks6m(data6m);

        await delay(10000); // 10 second delay

        const res1y = await fetch(urls[2], { method: "GET", headers: { "Content-Type": "application/json" } });
        if (!res1y.ok) throw new Error("Failed to fetch 1y tracks");
        const data1y = await res1y.json();
        setTracks1y(data1y);

        // Initialize with 4 weeks data
        setSelectedTracks(data4w);
        await delay(150); // let state update settle before hiding loader
        setLoading(false);
      } catch (err) {
        console.error("Error fetching tracks:", err);
        if (err.message.includes("Failed to fetch") || err.message.includes("NetworkError") || err.message.includes("ECONNREFUSED")) {
            setConnectionError(true);
        }
        setLoading(false);

      }
    }
    fetchAllTracks();
  }, [spotifyId]);
  
    const handleTimeRangeClick = (range) => {
        if (range === "4w") { 
            console.log('just clicked 4 weeks')
            setSelectedTracks(tracks4w)
        } else if (range === "6m") {
                console.log('just clicked 6 months')
                            console.log(tracks6m)

            setSelectedTracks(tracks6m) 
        } else if (range === "1y") { 
            console.log('just clicked 1 year')
                                        console.log(tracks1y)

            setSelectedTracks(tracks1y);
        };
    }

    return (
  <div className="track-stats">
    <div className="stats-button-options">
      <button disabled={loading} onClick={() => handleTimeRangeClick("4w")}>4 WEEKS</button>
      <button disabled={loading} onClick={() => handleTimeRangeClick("6m")}>6 MONTHS</button>
      <button disabled={loading} onClick={() => handleTimeRangeClick("1y")}>1 YEAR</button>
    </div>

    {loading ? (
      <div className="loading-container">
        {!connectionError ? (
          <>
            <img src={loadingIcon} alt="Loading..." className="loading-spinner" />
            <p className="loading-text">Loading...</p>
          </>
        ) : (
          <p className="connection-error-message">
            We apologize, but please wait 1 minute until you reload this page.
          </p>
        )}
      </div>
    ) : (
      <div className="track-list">
        {selectedTracks.map((track, index) => (
          <div
            key={index}
            className="TrackCard"
            onClick={() => {
              if (track?.spotifyId) {
                window.open(`https://open.spotify.com/track/${track.spotifyId}?go=0`, "_blank");
              }
            }}
            style={{ cursor: "pointer" }}
          >
            <div className="track-number">{index + 1}.</div>
            <div className="track-cover">
              <img src={track.image} alt={`${track.trackName} cover`} />
            </div>
            <div className="track-info">
              <h3 className="track-name">{track.trackName}</h3>
              <p className="track-artist">{track.artists}</p>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);
}

export default TrackStats;
