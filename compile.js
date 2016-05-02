var fs = require("fs");
var concat = require("concatenate-files");

var sources = JSON.parse(fs.readFileSync("compile-sources.json"));

concat(sources.main, "static/js/app.js", { separator: "\n" }, function(err, result) {} );
