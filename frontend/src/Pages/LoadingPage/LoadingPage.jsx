import "./LoadingPage.css";

function LoadingPage() {
    return (
        <>
            <div className="title">
                <p>Promptify</p>
            </div>
            <div className="loading-bar">
                <p>Curating a Promptify Playlist for you now...</p>
                <video
                width="640"
                height="360"
                autoPlay
                muted
                loop
                playsInline
                className="background-video"
                > 
                   <source src="/promptify_loading_bar.mp4" type="video/mp4" />
                </video>
            </div>

        </>

    );
}

export default LoadingPage;

