import "./GenreStats.css"
import { useEffect, useState } from "react";
import loadingIcon from "../../assets/favicon.png"; 

const GenreStats = () => {
    const spotifyId = localStorage.getItem("spotify_id");
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const [genre4w, setGenre4w] = useState([]);
    const [genre6m, setGenre6m] = useState([]);
    const [genre1y, setGenre1y] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState([]);
    const [loading, setLoading] = useState(true);
    const [connectionError, setConnectionError] = useState(false);


    function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

  useEffect(() => {
    if (!spotifyId) return;

    async function fetchAllGenres() {
        try {
            const urls = [
            `${API_BASE_URL}/user/top-genres/4w?spotifyId=${spotifyId}`,
            `${API_BASE_URL}/user/top-genres/6m?spotifyId=${spotifyId}`,
            `${API_BASE_URL}/user/top-genres/1y?spotifyId=${spotifyId}`,
        ];

        // await delay(30000); // 30 second delay



        const res4w = await fetch(urls[0], { method: "GET", headers: { "Content-Type": "application/json" } });
        if (!res4w.ok) throw new Error("Failed to fetch 4w genres");
        const data4w = await res4w.json();
        setGenre4w(data4w);

        // await delay(30000); // 30 second delay
                await delay(5000); // 5 second delay


        const res6m = await fetch(urls[1], { method: "GET", headers: { "Content-Type": "application/json" } });
        if (!res6m.ok) throw new Error("Failed to fetch 6m genres");
        const data6m = await res6m.json();
        setGenre6m(data6m);

        // await delay(30000); // 30 second delay
                await delay(5000); // 5 second delay


        const res1y = await fetch(urls[2], { method: "GET", headers: { "Content-Type": "application/json" } });
        if (!res1y.ok) throw new Error("Failed to fetch 1y genres");
        const data1y = await res1y.json();
        setGenre1y(data1y);

        // Initialize with 4 weeks data
        setSelectedGenre(data4w);
        await delay(90); // let state update settle before hiding loader
        setLoading(false);
      } catch (err) {
        console.error("Error fetching genres:", err);
          console.error("Error fetching genres:", err);

        if (err.message.includes("Failed to fetch") || err.message.includes("NetworkError") || err.message.includes("ECONNREFUSED")) {
            setConnectionError(true);
        }

        setLoading(false);

      }
    }
    fetchAllGenres();
  }, [spotifyId]);
  
    const handleTimeRangeClick = (range) => {
        if (range === "4w") { 
            console.log('just clicked 4 weeks')
            console.log(genre4w)
            setSelectedGenre(genre4w)
        } else if (range === "6m") {
            console.log('just clicked 6 months')
            console.log(genre6m)
            setSelectedGenre(genre6m) 
        } else if (range === "1y") { 
            console.log('just clicked 1 year')
            console.log(genre1y)

            setSelectedGenre(genre1y);
        };
    }

    return (
        <div className="genre-stats">

            <div className="stats-button-options">
                <button className="stats-button-options-btn" disabled={loading} onClick={() => handleTimeRangeClick("4w")}>4 WEEKS</button>
                <button className="stats-button-options-btn" disabled={loading} onClick={() => handleTimeRangeClick("6m")}>6 MONTHS</button>
                <button className="stats-button-options-btn" disabled={loading} onClick={() => handleTimeRangeClick("1y")}>1 YEAR</button>
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
                    {selectedGenre.map(([genreName, count], index) => (
                        <div key={index} className="TrackCard">
                        <div className="track-number">
                            {index + 1}.
                        </div>
                        <div className="track-info">
                            <h3 className="track-name">{genreName.toUpperCase()}</h3>
                        </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )

}

export default GenreStats;