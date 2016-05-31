var ipcRenderer = require("electron").ipcRenderer;

ipcRenderer.on("extended-params", function(event, args) {
  console.log(args);
});

function Core() {
  console.log("This is a static class.");
}

Core.start = function() {
  console.log("Ni hao!");
}

window.addEventListener("load", function() {
  Core.start();
});
