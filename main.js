var electron = require("electron");
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var ipcMain = electron.ipcMain;

var mainWindow = null;
var subWindows = { extended: null };

app.on("ready", function() {
  createMainWindow();
});

app.on("window-all-closed", function() {
  if(process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.on("open-window-extended", function(event, args) {
  if(!subWindows.extended) {
    subWindows.extended = new BrowserWindow({ width: 1080, height: 480 });
    subWindows.extended.loadURL("file://" + __dirname + "/extended.html");
    subWindows.extended.webContents.openDevTools();

    subWindows.extended.on("closed", function() {
      if(mainWindow) mainWindow.webContents.send("dialog-closed", "extended");
      subWindows.extended = null;
    });

    subWindows.extended.webContents.on("did-finish-load", function() {
      subWindows.extended.webContents.send("extended-params", args);
    });
  }
});

function createMainWindow() {
  mainWindow = new BrowserWindow({ width: 1360, height: 720 });

  mainWindow.loadURL("file://" + __dirname + "/index.html");

  mainWindow.webContents.openDevTools({ mode: "detach" });

  mainWindow.on("closed", function() {
    mainWindow = null;
    for(var a in subWindows) {
      var win = subWindows[a];
      if(win) win.close();
    }
  });

  mainWindow.webContents.on("devtools-opened", function() {
    mainWindow.focus();
  });
}
