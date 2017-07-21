var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');


var command = process.argv[2];
var commandTwo = process.argv[3];
var client = new Twitter(keys.twitterKeys)
var spotify = new Spotify(keys.spotifyKeys)

if (command === "my-tweets") {
	var params = {screen_name: 'TonyWahula', count: 1};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets[0].text);
    console.log(tweets[0].created_at)
  }
});
}
else if (command === "spotify-this-song") {
	spotify.search({ type: 'track', query: commandTwo, limit: 1}, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
  	// for (var i = 0; i < data.length; i++) {
  	// 	console.log(JSON.stringify(data[i], null, 2));;
  	// }
	console.log(JSON.stringify("Song: " + data.tracks.items[0].name, null, 2)); 
	console.log(JSON.stringify("Band: " + data.tracks.items[0].album.artists[0].name, null, 2));
	console.log(JSON.stringify("Album: " + data.tracks.items[0].album.name, null, 2));
	console.log(JSON.stringify("URL: " + data.tracks.items[0].album.artists[0].external_urls.spotify, null, 2));
	//console.log(JSON.stringify(data, null, 2))
  });
}
else if (command === "movie-this") {
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
else if (command === "do-what-it-says") {
	
}
