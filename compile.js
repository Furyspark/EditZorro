var fs = require("fs");
var concat = require("concatenate-files");
var packager = require("electron-packager");
var path = require("path");

var replaceFiles = [
  { from: "replace/main.js", to: "/resources/app/main.js" }
];

var packagerOptions = {
  dir: ".",
  arch: "x64",
  icon: "editzorro.ico",
  ignore: [
    /\.atom\-build\.json/i,
    /compile.+/i,
    /editzorro\.ico/i,
    /editzorro\.png/i,
    /readme\.md/i,
    /src/i,
    /rcedit\.exe/i,
    /main\.js$/,
    /replace$/
  ],
  afterCopy: [
    function(buildPath, electronVersion, platform, arch, callback) {
      var pathArr = buildPath.split(/[\\\/]/);
      var electronPath = pathArr.slice(0, -2).join("\/") + "/";
      fs.mkdirSync(electronPath + "static");
      fs.renameSync(buildPath + "/static/data", electronPath + "static/data");
      callback();
    }
  ],
  name: "EditZorro",
  out: "bin",
  platform: "win32",
  version: "1.3.5"
};

function copyFile(src, dest, callback) {
  var source = fs.createReadStream(src);
  var destination = fs.createWriteStream(dest);
  source.pipe(destination, { end: false });
  source.on("end", function() {
    if(callback) callback();
  });
}

var data = JSON.parse(fs.readFileSync("compile-data.json"));

for(var a = 0;a < data.length;a++) {
  var subData = data[a];
  var func = function(err, result) {};
  if(a === data.length-1) func = function(err, result) {
    packager(packagerOptions, function(err, appPaths) {
      if(err) console.log(err);
      for(var a = 0;a < appPaths.length;a++) {
        var appPath = appPaths[a];
        for(var b = 0;b < replaceFiles.length;b++) {
          var replaceFile = replaceFiles[b];
          copyFile(replaceFile.from, appPath + replaceFile.to);
        }
      }
    });
  };
  concat(subData.sources, subData.target, { separator: "\n" }, func );
}
