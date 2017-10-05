var request = require("request");
var keys = require("./keys.js");
var fs = require("fs");
var Twitter = require("twitter");
var client = new Twitter("keys");
var Spotify = require("node-spotify-api");
var command = process.argv[2];
var a = process.argv[3];
var params = {
	"screen_name" : "ruthiec_irl",
	"count" : 20
};

function showTweets() {
	client.GET('statuses/user_timeline', params, function (error, tweets, response) {
		if (!error) {
			for (var i = 0; i < tweets.length; i++) {
				console.log("\n****************************************\n");
				console.log("Tweet: " + tweets[i].text);
				console.log("Created: " + tweets[i].created_at);
				console.log("\n****************************************\n");
			}
		}
	})
};

function playSong(a) {
	var spotify = new Spotify({
		id: "29852749495a40fb8b8a5232f8b4c548",
		secret: "b7fd7f906b784ae2a1c70a0cfc3a16d0",
	});

	spotify.search({
		"type" : "track", 
		"query" : a
	}, function (error, data) {
		if (error) {
			console.log(error + "\n");
		} else if (a === "") {
			a = "The Sign";
		} else {
			console.log("\n****************************************\n");
			console.log("Artist: " + data.tracks.item[i].album.artists[i].name);
			console.log("Song: " + data.tracks.item[i].name);
			console.log("Preview: " + data.tracks.item[i].preview_url);
			console.log("Album: " + data.tracks.item[i].album.name);
			console.log("\n****************************************\n");
		}
	})
};

function showMovie(a) {
	var myQuery = "http://www.omdbapi.com/?t=" + a + "&y=&plot=short&apikey=40e9cece";

	request(myQuery, function(error, response, body) {
		if (!error && response.statusCode === 200) {
			console.log("\n****************************************\n");
			console.log("Title: " + JSON.parse(body).Title);
			console.log("Year Released: " + JSON.parse(body).Year);
			console.log("IMDB Rating: " +JSON.parse(body).Ratings[0]);
			console.log('Rotten Tomatoes Rating: ' + JSON.parse(body).Ratings[1]);
			console.log("Country of Production: " + JSON.parse(body).Country);
			console.log("Language: " + JSON.parse(body).Language);
			console.log("Plot: " + JSON.parse(body).Plot);
			console.log("Actors: " + JSON.parse(body).Actors);
			console.log("\n****************************************\n");
		}
	})
};

function doSomething() {

};

switch(command) {
	case "my-tweets":
	showTweets();
	break;

	case "spotify-this-song":
	playSong();
	break;

	case "movie-this":
	showMovie();
	break;

	case "do-what-it-says":
	doSomething();
	break;

	default:
	console.log("Not a valid request.");
	break;
};