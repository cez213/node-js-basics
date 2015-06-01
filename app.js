//Note: .js at the end of profile is optional, but path is mandatory
var profile = require("./profile.js");
var users = process.argv.slice(2);
//var users = ["carolynzelenetz", "chalkers"];
users.forEach(profile.get);
