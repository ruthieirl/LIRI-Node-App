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

};

function playSong() {

};

function showMovie() {

};

function dwis() {

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
	dwis();
	break;

	default:
	console.log("Not a valid request.");
	break;
};