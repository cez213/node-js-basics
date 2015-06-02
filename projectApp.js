//projectApp.js
var profile = require("./projectProfile.js");
var latitude = process.argv[2];
var longitude = process.argv[3];
profile.get(latitude, longitude);
