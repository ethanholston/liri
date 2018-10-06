require("dotenv").config();
var moment = require('moment');
var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
    });

var queryUrl;

function liri(){
    switch(process.argv[2]){
        case "spotify-this-song": getSong();
        break;
        case "movie-this": getMovie();
        break;
        case "concert-this": getConcert();
        break;
    }
}

function getSong(){
    if(process.argv[3]){
        songName = process.argv[3];
    }
    else{
        songName = "The Sign Ace of Base";
    }
    spotify.search({ type: 'track', query: songName }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        console.log("Artist: " + data.tracks.items[0].artists[0].name + "\nSong Name: " + data.tracks.items[0].name + "\nPreview URL: " + data.tracks.items[0].preview_url + "\nAlbum: " + data.tracks.items[0].album.name);
    });
}

function getMovie(){
    var movieName;
    if(process.argv[3]){
        movieName = process.argv[3];
    }
    else{
        movieName = "Mr Nobody";
    }
    queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    axios.get(queryUrl).then(
        function(response) {
            console.log("Title: " + response.data.Title + "\nYear: " + response.data.Year + "\nIMDB Rating: " + response.data.Ratings[0].Value + "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\nCountry: " + response.data.Country + "\nLanguage(s): " + response.data.Language + "\nPlot: " + response.data.Plot + "\nActors: " + response.data.Actors);
        }
    );
}

function getConcert(){
    queryUrl = "https://rest.bandsintown.com/artists/" + process.argv[3] + "/events?app_id=codingbootcamp";
    axios.get(queryUrl).then(
        function(response){
            console.log("Venue name: " + response.data[0].venue.name + "\nLocation: " + response.data[0].venue.city + ", " + response.data[0].venue.region + "\nDate: " + moment(response.data[0].datetime).format("MM/DD/YYYY"))
        }
    );
}

liri();