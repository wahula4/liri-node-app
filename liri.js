// retrieves keys for twitter and spotify
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require("fs");

var command = process.argv[2];
var commandTwo = process.argv[3];
//refers to twitter keys
var client = new Twitter(keys.twitterKeys)
//refers to spotify keys
var spotify = new Spotify(keys.spotifyKeys)

	// if the user's command is my-tweets, run the tweet function
	if (command === "my-tweets") {
		return tweet();
	}
	// if the user's command is movie-this, run the movie function
	else if (command === "movie-this") {
	 	return movie();
	 }
	 // if the user's command is do-what-it-says, run the doWhatItSays function
	else if (command === "do-what-it-says") {
		return doWhatItSays();
	}
	// if the user's command is spotify-this-song, run the music function
	else if (command === "spotify-this-song") {
		return music();
	}
	// function for spotify
	function music() {
		// if commandTwo is undefined, we will give an example of a song.
		if (commandTwo === undefined) {
			console.log("Pick a song next time, here's the song 'Eye of the Tiger'")
			commandTwo = "Eye of the Tiger";
		}
		// there will only be one result per search
		spotify.search({ type: 'track', query: commandTwo, limit: 1}, function(err, data) {
			if (err) {
			    return console.log('Error occurred: ' + err);
			  }
				console.log(JSON.stringify("Song: " + data.tracks.items[0].name, null, 2)); 
				console.log(JSON.stringify("Band: " + data.tracks.items[0].album.artists[0].name, null, 2));
				console.log(JSON.stringify("Album: " + data.tracks.items[0].album.name, null, 2));
				console.log(JSON.stringify("URL: " + data.tracks.items[0].album.artists[0].external_urls.spotify, null, 2));
	    });	
	}
	// tweet function
	function tweet() {
			var params = {screen_name: 'TonyWahula', count: 2};
		client.get('statuses/user_timeline', params, function(error, tweets, response) {
		  if (!error) {
		  	// console log every week up to count 2
		  	for (var i = 0; i < tweets.length; i++) {
		  		console.log(tweets[i].text);
		    	console.log(tweets[i].created_at)
		  	};
		  };
		});
	};
	 // movie function
	 function movie() {
	 		// if commandTwo is undefined, an example movie will be chosen
	 		if (commandTwo === undefined) {
	 			console.log("Pick a movie next time, here's the movie 'It'")
				commandTwo = "It";
			}
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
		});
	}
	// function that read random.txt -- currently it should retrieve movie data for 'Toy Story'
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