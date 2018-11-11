require("dotenv").config();
var keys = require("./keys.js");
var moment = require('moment');
var request = require('request');
var Spotify = require('node-spotify-api');
var fs = require('fs');
var cmd = process.argv[2];
var nodeArgs = process.argv;
var input = "";


for (var i = 3; i < nodeArgs.length; i++) {
  
  if (i > 3 && i < nodeArgs.length) {
  input = input + "+" + nodeArgs[i]; 
  
} else {
  
  input += nodeArgs[i];
}


  if (cmd === "movie-this") {
  //  var request = require('request');
    request('http://www.omdbapi.com/?t=' + input + '&apikey=trilogy', { json: true }, function (error, response, body) {
      console.log(body.Title);
      console.log(body.Year);
      console.log("imdb Rating: " + body.imdbRating);
      console.log("Rotten Tomatoes: " + body.Ratings[1].Value);
      console.log("Language: " + body.Language);
      console.log("Country: " + body.Country);
      console.log("Plot: " + body.Plot);
      console.log("Starring: " + body.Actors);
    });
  }
  if(cmd === "concert-this") {
  //  var request = require("request");
    request('https://rest.bandsintown.com/artists/'+ input + '/events?app_id=codingbootcamp',{json: true}, function(error, response, body) {
   
    var date = moment(body[0].datetime).format("LL");

    console.log(body[0].venue.city + ", " + body[0].venue.region);
    console.log(body[0].venue.name);
    console.log(date);
    console.log(body[0].description);
});
  }
  if(cmd === "spotify-this-song") {
    //var Spotify = require('node-spotify-api');
    
       
var spotify = new Spotify({
  id: keys.spotify.id,
  secret:keys.spotify.secret 
});
if(nodeArgs[3] === undefined) {
  input = "The Sign";
} 

spotify.search({type:'track', query: input}, function(err, data) {
  
  
  
  if(err) {
  return  console.log("Error!!!, error: " + err);
  }

  console.log(data.tracks.items[0].album.artists[0].name);
  console.log(data.tracks.items[0].name);
  console.log(data.tracks.items[0].album.name);
  console.log(data.tracks.items[0].external_urls.spotify);
  console.log("``````````````````````````````````````````")

});
 

  }
  if(cmd === "do-what-it-says") {
   // require("fs");
    fs.readFile("random.txt","utf8",function(err,data){
     if(err) {
       console.log(err);
     }
       data = nodeArgs;
      console.log(data);
    });
  }

}