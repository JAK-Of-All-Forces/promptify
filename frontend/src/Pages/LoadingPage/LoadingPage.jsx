import "./LoadingPage.css";

function LoadingPage() {


    // <div className="loading-bar">
    //             <p>Curating a Promptify Playlist for you now...</p>
    //             <video
    //             width="640"
    //             height="360"
    //             autoPlay
    //             muted
    //             loop
    //             playsInline
    //             className="background-video"
    //             > 
    //                <source src="/promptify_loading_bar.mp4" type="video/mp4" />
    //             </video>
    // </div>

    return (
        <>
           <div className="loading-page-container">
                <div className="title">
                    <p>PROMPTIFY</p>
                </div>
                <div className="center-content">
                    <div className="loading-dots"></div>
                    <div className="prompt-caption">
                        <p>Curating a Promptify playlist for you now...</p>
                    </div>
                </div>
            </div>
        </>

    );
}

export default LoadingPage;

