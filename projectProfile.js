//projectProfile.js
var https = require('https');

//Print out message
function printMessage(latitude, longitude, temperature){
	var message = "The temperature in " + latitude + longitude + " is " + temperature + " degrees";
	console.log(message);
}

//Print out error message
function printError(error){
	console.error(error.message);
}

function get(latitude, longitude){
	//Connect to the API URL for changing latitude & longitude to zipcode: API KEY = AIzaSyCHRpq1EFHXcUX4r5d1ax1D-XlFhijholw
	//https://maps.googleapis.com/maps/api/geocode/json?address=Winnetka&key=AIzaSyCHRpq1EFHXcUX4r5d1ax1D-XlFhijholw
	//Connect to the API URL weather website
	//var request = https.get("https://maps.googleapis.com/maps/api/geocode/json?address="+ + "&key=AIzaSyCHRpq1EFHXcUX4r5d1ax1D-XlFhijholw")
	var request = https.get("https://api.forecast.io/forecast/c180b11f0537018296ced9a9e1a1b798/" + latitude + "," + longitude, function(response){
	var body = "";
	//Read the data
	response.on('data', function(chunk){
		body += chunk;
	});
	response.on('end', function(){
		if(response.statusCode === 200){
			try{
				//Parse the data
				var weather = JSON.parse(body);
				//Print the data
				printMessage(latitude, longitude, weather.currently.temperature);
			} catch(error){
				//Parse Error
				printError(error);
			}
		}else{
			//Status Code Error
			printError({message: "There was an error getting the weather for " + latitude + "," + longitude + ". (" + https.STATUS_CODES[response.statusCode] + ")"});
		}

	});
});

//Connection Error
request.on("error", printError);
}

//For profile module, we want to export function
module.exports.get = get;