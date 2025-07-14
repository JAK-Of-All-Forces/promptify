function LandingPage() {
    return (
        <nav>
            {/* Link to about us page */}
            <div className="about-us">
                <Link to={`/about`}>
                    <h3>About Us</h3>
                </Link>
            </div>
        </nav>


        //Rest of the landing page content below


    );
}

export default LandingPage;