//Variables
var request = require("request");
var keys = require("./keys.js");
var fs = require("fs");
var Twitter = require("twitter");
var client = new Twitter(keys);
var Spotify = require("node-spotify-api");
var command = process.argv[2];
var a = process.argv[3];
var params = {
	screen_name : "ruthiec_irl",
	count : 20
};
var spotify = new Spotify({
		id: "29852749495a40fb8b8a5232f8b4c548",
		secret: "b7fd7f906b784ae2a1c70a0cfc3a16d0",
});


//Twitter Function to show last 20 tweets
function showTweets() {
	client.get('statuses/user_timeline', params, function (error, tweets, response) {
		if (!error) {
			for (var i = 0; i < tweets.length; i++) {
				console.log("\n****************************************\n");
				console.log("Tweet: " + tweets[i].text);
				console.log("Created: " + tweets[i].created_at);
				console.log("\n****************************************\n");
			} 
		} else {
			console.log(error);
		}
	})
};

//Spotify Function to play a song by title
function playSong(a) {
	if (a === "" || a === undefined) {
		a = "Ace of Base";
		playSong(a);
	} else {
		spotify.search({
		type : "track", 
		query : a
	}, function (error, data) {
		if (error) {
			console.log(error + "\n");
		} else {
			console.log("\n****************************************\n");
			//Artist Name
			console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
			//Song Name
			console.log("Song: " + data.tracks.items[0].name);
			//Preview URL
			console.log("Preview URL: " + data.tracks.items[0].preview_url);
			//Album Name
			console.log("Album: " + data.tracks.items[0].album.name);
			console.log("\n****************************************\n");
		}
	})
	}
};

//OMDB Function to show movie details
function showMovie(a) {
	var myQuery = "http://www.omdbapi.com/?t=" + a + "&y=&plot=short&apikey=40e9cece";
	request(myQuery, function(error, response, body) {
		if (a === "" || a === undefined) {
			showMovie("Mr Nobody");
		} else if (!error && response.statusCode === 200) {
			console.log("\n****************************************\n");
			//Console Log all movie details below
			console.log("Title: " + JSON.parse(body).Title);
			console.log("Year Released: " + JSON.parse(body).Year);
			console.log("IMDB Rating: " +JSON.parse(body).Ratings[0].Value);
			console.log('Rotten Tomatoes Rating: ' + JSON.parse(body).Ratings[1].Value);
			console.log("Country of Production: " + JSON.parse(body).Country);
			console.log("Language: " + JSON.parse(body).Language);
			console.log("Plot: " + JSON.parse(body).Plot);
			console.log("Actors: " + JSON.parse(body).Actors);
			console.log("\n****************************************\n");
		}
	})
};

//Do What It Says Function
function doSomething() {
	fs.readFile("./random.txt", "utf8", function(err, data) {
		if (err) {
			throw err;
		} else {
			var dataArr = data.split(",");
			a = dataArr[1];
			playSong(a);
		}
	});
};

//Switch statement to run above functions
switch(command) {
	
	case "my-tweets":
	showTweets();
	break;

	case "spotify-this-song":
	playSong(a);
	break;

	case "movie-this":
	showMovie(a);
	break;

	case "do-what-it-says":
	doSomething();
	break;

	default:
	console.log("*******************************************");
	console.log("****        Not A Valid Request        ****");
	console.log("*******************************************");
	console.log("Please enter one of the following commands:");
	console.log("****                                   ****");
	console.log("****             my-tweets             ****");
	console.log("****         spotify-this-song         ****");
	console.log("****             movie-this            ****");
	console.log("****          do-what-it-says          ****");
	console.log("****                                   ****");
	console.log("*******************************************");
	console.log("*******************************************");
	break;
};