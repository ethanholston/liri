require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
    });

var queryUrl;

switch(process.argv[2]){
    case "spotify-this-song": getSong();
    case "movie-this": getMovie();
    case "concert-this": getConcert();
}

function getSong(){
    spotify.search({ type: 'track', query: process.argv[3] }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        console.log("Artist: " + data.tracks.items[0].artists[0].name + "\nSong Name: " + data.tracks.items[0].name + "\nPreview URL: " + data.tracks.items[0].preview_url + "\nAlbum: " + data.tracks.items[0].album.name);
    });
}

function getMovie(){
    queryUrl = "http://www.omdbapi.com/?t=" + process.argv[3] + "&y=&plot=short&apikey=trilogy";
    axios.get(queryUrl).then(
        function(response) {
          console.log("Title: " + response.data.Title + "\nYear: " + response.data.Year + "\nIMDB Rating: " + response.data.Ratings[0].Value + "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\nCountry: " + response.data.Country + "\nLanguage(s): " + response.data.Language + "\nPlot: " + response.data.Plot + "\nActors: " + response.data.Actors);
        }
      );
}

getMovie();