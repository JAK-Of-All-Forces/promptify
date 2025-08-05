import "./LoadingPage.css";

function LoadingPage() {

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

