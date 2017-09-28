var request = require("request");
var keys = require("./keys.js");
var fs = require("fs");
var Twitter = require("twitter");
var twit = new Twitter(keys);
var command = process.argv[2];
var params = {
	"screen_name" = "ruthiec_irl",
	"count" = 20
};
