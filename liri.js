var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require("fs");


var command = process.argv[2];
var commandTwo = process.argv[3];
var client = new Twitter(keys.twitterKeys)
var spotify = new Spotify(keys.spotifyKeys)


	if (command === "my-tweets") {
		tweet();
	}

	else if (command === "movie-this") {
	 	movie();
	 }

	else if (command === "do-what-it-says") {
		doWhatItSays();
	}

	else if (command === "spotify-this-song") {
		spotify();
	}

	function spotify() {
		spotify.search({ type: 'track', query: commandTwo, limit: 1}, function(err, data) {
			if (err) {
			    return console.log('Error occurred: ' + err);
			  }
		  	for (var i = 0; i < data.length; i++) {
				console.log(JSON.stringify("Song: " + data.tracks.items[i].name, null, 2)); 
				console.log(JSON.stringify("Band: " + data.tracks.items[i].album.artists[0].name, null, 2));
				console.log(JSON.stringify("Album: " + data.tracks.items[i].album.name, null, 2));
				console.log(JSON.stringify("URL: " + data.tracks.items[i].album.artists[0].external_urls.spotify, null, 2));
			}
	    });
	}

	function tweet() {
			var params = {screen_name: 'TonyWahula', count: 1};
		client.get('statuses/user_timeline', params, function(error, tweets, response) {
		  if (!error) {
		    console.log(tweets[0].text);
		    console.log(tweets[0].created_at)
		  }
		});
	}

	 function movie() {
		request('http://www.omdbapi.com/?apikey=40e9cece&t=' + commandTwo + `&tomatoes=true`, function (error, response, body) {
			omdb = JSON.parse(body);
			console.log("Movie Title: " + omdb.Title);
			console.log("Year: " + omdb.Year);
			console.log("Rating: " + omdb.imdbRating);
			console.log("Country produced: " + omdb.Country);
			console.log("Language: " + omdb.Language);
			console.log("Plot: " + omdb.Plot);
			console.log("Actors: " + omdb.Actors);
			console.log("URL: " + omdb.tomatoURL);
		})
	}

	function doWhatItSays() {
			fs.readFile("random.txt", "utf8", function (err, data) {
	        	if (err) {
	         	 return console.log(err);
	        	}
	        	else {
 				  textArray = []
		          textArray = data.split(", ");
		          command = textArray[0].trim();
		          commandTwo = textArray[1].trim();
		          movie();
				}
			})	
	}