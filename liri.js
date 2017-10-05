var request = require("request");
var keys = require("./keys.js");
var fs = require("fs");
var Twitter = require("twitter");
var client = new Twitter("keys");
var Spotify = require("spotify");
var command = process.argv[2];
var params = {
	"screen_name" : "ruthiec_irl",
	"count" : 20
};

function showTweets() {
	client.GET('statuses/user_timeline', params, function (error, tweets, response) {
		if (!error) {
			for (var i = 0; i < tweets.length; i++) {
				console.log("Tweet: " + tweets[i].text);
				console.log("Created: " + tweets[i].created_at);
			}
		}
	})
};

function playSong() {

};

function showMovie() {

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