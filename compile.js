var fs = require("fs");
var concat = require("concatenate-files");

var data = JSON.parse(fs.readFileSync("compile-data.json"));

for(var a = 0;a < data.length;a++) {
  var subData = data[a];
  concat(subData.sources, subData.target, { separator: "\n" }, function(err, result) {} );
}
