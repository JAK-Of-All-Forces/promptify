import NavBar from "../../Components/NavBar/NavBar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PromptPage.css";
import { toast } from "react-toastify";
import Lottie from "lottie-react";
import animationData from '../../assets/Playing Vinyl Disc.json';



function PromptPage ({token, setToken}) {
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [inputPlaylistName, setInputPlaylistName] = useState("");
  const [showActivityInput, setShowActivityInput] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState("");
  const [showDurationInput, setShowDurationInput] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState("");
  const [genres, setGenres] = useState([]);
  const [genreSearchTerm, setGenreSearchTerm] = useState("");
  const [showGenreInput, setShowGenreInput] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [showBPMInput, setShowBPMInput] = useState(false);
  const [bpmLow, setBPMLow] = useState("");
  const [bpmHigh, setBPMHigh] = useState("");
  const [allowGenerate, setAllowGenerate] = useState(false);

  useEffect(() => {
    async function fetchGenres() {
      const spotifyId = localStorage.getItem("spotify_id");
      const response = await fetch(`${API_BASE_URL}/playlist/getGenres?spotifyId=${spotifyId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();
      setGenres(result.genres);
    }
    fetchGenres();
  }, []);



  if(!token){
    return null; 
  }

  // playlist Name logic
  const handleOnNameInputChange = (event) => {
    setInputPlaylistName(event.target.value);
  };

  // activity button logic
  const activities = [
    "Studying", "Commuting", "Hiking", "Yoga", "Gym", "Sleep", "Working,", "Cooking", "Cleaning", "Relaxing", "Running", "Driving",
    "Meditiation", "Partying", "Reading", "Shopping", "Walking", "Gaming"
  ]; 
  const handleActivityButtonClick = (activity) => {
    setSelectedActivity([activity]);
  }
  const toggleActivities = () => {
    setShowActivityInput((prev) => !prev);
  };

  // duration button logic
  const durations = [
    "15 minutes",
    "30 minutes",
    "45 minutes",
    "60 minutes",
    "75 minutes",
    "90 minutes",
    "105 minutes",
    "120 minutes",
  ];
  function handleDurationChange(event) {
    // stretch feature: change 90 minutes to be hour and minutes format to users
    if (selectedDuration.includes(event)) {
      setSelectedDuration(selectedDuration.filter((d) => d !== event));
    } else {
      setSelectedDuration([event]);
    }
  }
  const toggleDuration = () => {
    if (selectedActivity.length !== 1) {
      toast.error("Please select ONE activity before continuing.");
      return;
    } else {
      setShowDurationInput((prev) => !prev);
    }
  };

  // genre button logic
  function handleGenreCheckboxChange(event) {
    const { value, checked } = event.target; // destructures event to the value and checked
    if (checked) {
      setSelectedGenres([...selectedGenres, value]);
    } else {
      setSelectedGenres(selectedGenres.filter((a) => a !== value)); // removes unchecked values from selected activities
    }
  }
  const toggleGenre = () => {
    if (!selectedDuration || !selectedActivity) {
      toast.error(
        "Please select the activity and duration of your activity to set the length of your playlist before continuing."
      );
    } else {
      setShowGenreInput((prev) => !prev);
    }
  };
  const filteredGenres = genres.filter((genre) =>
    genre.toLowerCase().includes(genreSearchTerm.toLowerCase())
  );

  // BPM button logic
  const handleBPMLowInputChange = (event) => {
    setBPMLow(event.target.value); // just update the raw input
  };
  const handleBPMHighInputChange = (event) => {
    setBPMHigh(event.target.value); // just update the raw input
  };
  const toggleBPM = () => {
    if (selectedGenres.length === 0 || !selectedDuration || !selectedActivity) {
      toast.error(
        "Please select the activity,  genre(s), and duration you would like to be in your playlist before continuing."
      );
    } else {
      setShowBPMInput((prev) => !prev);
    }
  };

  // generate playlist logic
  const proceedGenerate = () => {
    setAllowGenerate(true);
  };
  async function generatePlaylist() {
    if (selectedGenres && selectedDuration && selectedActivity) {
      const low = parseInt(bpmLow);
      const high = parseInt(bpmHigh);

      const bpmProvided = bpmLow !== "" && bpmHigh !== "";

      if (bpmProvided) {
        if (
          isNaN(low) ||
          isNaN(high) ||
          low < 40 ||
          low > 200 ||
          high < 40 ||
          high > 200
        ) {
          toast.error("Please enter BPM values between 40 and 200.");
          return;
        }
      } else {
        if (!allowGenerate) {
          toast.error(
            "You did not set a BPM Low, BPM High, or select the PROCEED button."
          );
          return;
        }
      }

      const spotifyID = localStorage.getItem("spotify_id");
      const payload = {
        name: inputPlaylistName ? inputPlaylistName : "Promptify Playlist",
        activity: selectedActivity[0],
        bpmLow: bpmLow ? bpmLow : 0,
        bpmHigh: bpmHigh ? bpmHigh : 0,
        genres: selectedGenres,
        duration: Number(selectedDuration[0]?.replace(" minutes", "")),
        spotifyId: spotifyID,
      };

      console.log(payload);

      try {
        navigate("/loading"); // uncomment when the loading state page is made
        const response = await fetch(`${API_BASE_URL}/playlist/createPrompt`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(
            `error! something went wrong when posting to backend. status: ${response.status}`
          );
        }

        const result = await response.json();
        console.log("Playlist created:", result);
        if (result.id) {
          console.log("Playlist ID found in result");
          console.log(result.id);
        } else {
          console.error("Playlist ID not found in result:");
        }

        // navigate user after success
        navigate(`/playlist/${result.id}`);

        return result;
      } catch (error) {
        console.error("Failed to create playlist prompt:", error);
      }

      // resetting the page inputs
      setInputPlaylistName("");
      setSelectedActivity("");
      setBPMLow("");
      setBPMHigh("");
      setSelectedGenres([]);
      setSelectedDuration("");
      setShowActivityInput(false);
      setShowBPMInput(false);
      setShowDurationInput(false);
      setShowGenreInput(false);
    } else {
      toast.error(
        "Please make sure you have chosen an activity, set the duration, and selected a genre."
      );
    }
  }

  return (
    <>
      <NavBar token={token}></NavBar>
      <div className="prompt-container">
        <div className="left-side-animation">
          <Lottie animationData={animationData} loop autoplay />
        </div>
        <div className="right-side">
          <div className="caption">
            <p>Your vibe, your music, your prompt, your playlist!</p>
          </div>
          <div className="playlist-prompt-section">
            <div className="playlist-name">
              <p>Playlist Name: </p>
              <input
                type="text"
                placeholder="Optional"
                value={inputPlaylistName}
                onChange={handleOnNameInputChange}
              />
            </div>
            <div className="activity-button">
              <button onClick={toggleActivities}>Choose an Activity</button>
              <div
                className={`sidebar ${showActivityInput ? "open" : "closed"}`}>
                {activities.map((activity) => (
                  <button
                    key={activity}
                    className={`activity-option ${selectedActivity.includes(activity) ? "selected" : ""}`}
                    onClick={() => handleActivityButtonClick(activity)}
                  >
                    {activity}
                  </button>
                ))}
                {selectedActivity.length > 0 ? (
                  <p>
                    Your selected activity is: {selectedActivity.join(", ")}
                  </p>
                ) : (
                  <p>You have not selected any activities.</p>
                )}
              </div>
            </div>
            <div className="duration-button">
              <button onClick={toggleDuration}>Set the Duration</button>
              <div
                className={`sidebar ${showDurationInput ? "open" : "closed"}`}>
                {durations.map((duration) => (
                  <button
                    key={duration}
                    onClick={() => handleDurationChange(duration)}
                    className={
                      selectedDuration.includes(duration) ? "selected" : ""
                    }>
                    {duration}
                  </button>
                ))}
                {selectedDuration.length > 0 ? (
                  <p>
                    Your selected duration is: {selectedDuration.join(", ")}
                  </p>
                ) : (
                  <p>You have not selected a duration.</p>
                )}
              </div>
            </div>
            <div className="genre-button">
              <button onClick={toggleGenre}>Select the Genre(s)</button>
              <div className={`sidebar ${showGenreInput ? "open" : "closed"}`}>
                <input
                  className="genre-search"
                  type="text"
                  placeholder="Search genres here..."
                  value={genreSearchTerm}
                  onChange={(e) => setGenreSearchTerm(e.target.value)}
                />
                <div className="all-genres">
                  {filteredGenres.length > 0 ? (
                    filteredGenres.map((genre) => (
                      <label key={genre} >
                        <input
                          type="checkbox"
                          value={genre}
                          checked={selectedGenres.includes(genre)}
                          onChange={handleGenreCheckboxChange}
                        />
                        {genre}
                      </label>
                    ))
                  ) : (
                    <p>No genres found.</p>
                  )}
                </div>

                {selectedGenres.length > 0 ? (
                  <p>Your selected genres are: {selectedGenres.join(", ")}</p>
                ) : (
                  <p>You have not selected any genres.</p>
                )}
              </div>
            </div>
            <div className="bpm-button">
              <button onClick={toggleBPM}>Set a BPM Range (Optional)</button>
              <div className={`sidebar ${showBPMInput ? "open" : "closed"}`}>
                <input
                  type="number"
                  placeholder="40"
                  min="40"
                  max="200"
                  value={bpmLow}
                  onChange={handleBPMLowInputChange}
                />
                <input
                  type="number"
                  placeholder="200"
                  min="40"
                  max="200"
                  value={bpmHigh}
                  onChange={handleBPMHighInputChange}
                />
                {bpmLow && bpmHigh ? (
                  <p>
                    Your chosen BPM range is : {bpmLow} to {bpmHigh}.
                  </p>
                ) : (
                  <>
                    <p>You have not chosen a BPM range.</p>
                    <p>
                      If you are okay with that, please press the PROCEED
                      button, and then press generate playlist.
                    </p>
                    <button onClick={proceedGenerate}>PROCEED</button>
                  </>
                )}
              </div>
            </div>
            <div className="generate-button">
              <button onClick={generatePlaylist}>Generate a Playlist!</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PromptPage;
