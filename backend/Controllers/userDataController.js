const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const axios = require("axios");




const getAccessToken = async(userId) => {
  const response = await prisma.user.findUnique({
    where: { id: userId },
    select: { accessToken: true }
  });

  if (response){
    console.log("we got the accesss token")
    return response.accessToken
  } else {
    return null
  }
}

// get top tracks (4 weeks), limit = 30 - return the album, artists, spotify id, track name
const topTracks4 = async (userId) => {
    try {
        console.log("grabbing the top tracks for this user...");
        const spotifyToken = await getAccessToken(userId);
        if (spotifyToken){
            console.log(`looking up tracks...`);
        } else {
            console.log("there is no valid token")
        }

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + spotifyToken
        };
    
        console.log("about to get short term top tracks");
        const response = await axios.get(
            `https://api.spotify.com/v1/me/top/tracks`,
            {
                headers,
                params: {
                    limit: 30,
                    time_range: "short_term"
                }
            }
        );
        console.log("got the short term top tracks");

        const topTracks = response.data.items;
        const simplifiedTracks = [];
        const payloadTrackInfo = [];

        for (let i = 0; i < topTracks.length; i++) {
            const currTrack = topTracks[i];
            
            const trackName = currTrack.name;
            const spotifyId = currTrack.id;
            const albumName = currTrack.album.name;
            const artists = currTrack.artists.map(artist => artist.name).join(', '); // .join makes it a string

            simplifiedTracks.push({
                trackName, spotifyId, albumName, artists
            });
            payloadTrackInfo.push({
                trackName, artists
            });
        }
        console.log(simplifiedTracks);

        return {payloadTrackInfo, simplifiedTracks}
    } catch (error) {
        console.error("Error in topTracks4:", error.response?.data || error.message || error);
    }

}

// get top tracks (6 months), limit = 30 - return the album, artists, spotify id, track name
const topTracks6 = async (userId) => {
try {
    console.log("grabbing the top tracks for this user...");
    const spotifyToken = await getAccessToken(userId);
    if (spotifyToken){
        console.log(`looking up tracks...`);
    } else {
        console.log("there is no valid token")
    }

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + spotifyToken
    };

    console.log("about to get short term top tracks");
    const response = await axios.get(
        `https://api.spotify.com/v1/me/top/tracks`,
        {
            headers,
            params: {
                limit: 30,
                time_range: "medium_term"
            }
        }
    );
    console.log("got the short term top tracks");

    const topTracks = response.data.items;
    const simplifiedTracks = [];

    for (let i = 0; i < topTracks.length; i++) {
        const currTrack = topTracks[i];
        
        const trackName = currTrack.name;
        const spotifyId = currTrack.id;
        const albumName = currTrack.album.name;
        const artists = currTrack.artists.map(artist => artist.name).join(', '); // .join makes it a string

        simplifiedTracks.push({
            trackName, spotifyId, albumName, artists
        });
        payloadTrackInfo.push({
            trackName, artists
        });
    }
    console.log(simplifiedTracks);
    
} catch (error) {
    console.error("Error in topTracks4:", error.response?.data || error.message || error);
}

}

// get top tracks (one year), limit = 30 - return the album, artists, spotify id, track name
const topTracks1 = async (userId) => {
    try {
        console.log("grabbing the top tracks for this user...");
        const spotifyToken = await getAccessToken(userId);
        if (spotifyToken){
            console.log(`looking up tracks...`);
        } else {
            console.log("there is no valid token")
        }

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + spotifyToken
        };
    
        console.log("about to get short term top tracks");
        const response = await axios.get(
            `https://api.spotify.com/v1/me/top/tracks`,
            {
                headers,
                params: {
                    limit: 30,
                    time_range: "long_term"
                }
            }
        );
        console.log("got the short term top tracks");

        const topTracks = response.data.items;
        const simplifiedTracks = [];

        for (let i = 0; i < topTracks.length; i++) {
            const currTrack = topTracks[i];
            
            const trackName = currTrack.name;
            const spotifyId = currTrack.id;
            const albumName = currTrack.album.name;
            const artists = currTrack.artists.map(artist => artist.name).join(', '); // .join makes it a string

            simplifiedTracks.push({
                trackName, spotifyId, albumName, artists
            });
            payloadTrackInfo.push({
                trackName, artists
            });
        }
        console.log(simplifiedTracks);
    } catch (error) {
        console.error("Error in topTracks4:", error.response?.data || error.message || error);
    }

}

// get top albums (4 weeks), top 10
const topAlbums4 = async (userId) => {
    try {
        console.log("grabbing the top albums for this user...");
        const { shortTermTrackDataFull, shortTermTrackData } = await topTracks4(userId);



        const topTracks = response.data.items;
        const simplifiedTracks = [];
        const payloadTrackInfo = [];

        for (let i = 0; i < topTracks.length; i++) {
            const currTrack = topTracks[i];
            
            const trackName = currTrack.name;
            const spotifyId = currTrack.id;
            const albumName = currTrack.album.name;
            const artists = currTrack.artists.map(artist => artist.name).join(', '); // .join makes it a string

            simplifiedTracks.push({
                trackName, spotifyId, albumName, artists
            });
            payloadTrackInfo.push({
                trackName, artists
            });
        }
        console.log(simplifiedTracks);

        return payloadTrackInfo
    } catch (error) {
        console.error("Error in topTracks4:", error.response?.data || error.message || error);
    }

}

// get top albums (6 months), top 10
const topAlbums6 = async (req, res) => {

}

// get top albums (one year), top 10
const topAlbums1 = async (req, res) => {

}

// get top artists (4 weeks), limit = 15 - return the genres, artist name, spotify id
const topArtists4 = async (req, res) => {

}

// get top artists (6 months), limit = 15 - return the genres, artist name, spotify id
const topArtists6 = async (req, res) => {

}

// get top artists (one year), limit = 15 - return the genres, artist name, spotify id
const topArtists1 = async (req, res) => {

}

// get dominant genres (4 weeks), top 5
const topGenres4 = async (req, res) => {

}

// get dominant genres (6 months), top 5
const topGenres6 = async (req, res) => {

}

// get dominant genres (one year), top 5
const topGenres1 = async (req, res) => {

}

// get an artists related artists - no route needed
const getRelatedArtists = async (req, res) => {

}


module.exports = {
    topTracks4,
    topTracks6,
    topTracks1,
    topAlbums4,
    topAlbums6,
    topAlbums1,
    topArtists4,
    topArtists6,
    topArtists1,
    topGenres4,
    topGenres6,
    topGenres1,
    getRelatedArtists
}