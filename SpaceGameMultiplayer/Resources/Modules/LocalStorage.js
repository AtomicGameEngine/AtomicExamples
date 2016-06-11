var PREFS_FILE = "SpaceGameMultiPlayer.json";

// Defaults
var MASTER_SERVER_IP = "52.37.100.204";
var MASTER_SERVER_PORT = 41234;
var SERVER_PORT = 27000;

var filesystem = Atomic.getFileSystem();

// Get out documents folder
var documentsDir = filesystem.getUserDocumentsDir();

var prefFilePath = documentsDir + PREFS_FILE;


function LocalStorage() {
    
}

function getJSONPrefData() {
    if (filesystem.fileExists(prefFilePath)) {
        var file = new Atomic.File(prefFilePath, Atomic.FILE_READ);

        // Read the data string and parse the JSON back to an object
        var fileData = file.readString();

        var json = JSON.parse(fileData);

        return json;
    }

    return {};
}

LocalStorage.prototype.setServerName = function(serverName) {

    var mydata = getJSONPrefData();

    mydata.server_name = serverName;

    var file = new Atomic.File(prefFilePath, Atomic.FILE_WRITE);

    // Convert the data object to a string and write it
    file.writeString(JSON.stringify(mydata));

    // close the file
    file.close();
}

LocalStorage.prototype.getServerName = function() {
    var json = getJSONPrefData();

    if (json.server_name) {
        return json.server_name;
    }

    return "Server";
}

LocalStorage.prototype.getServerPort = function() {
    var json = getJSONPrefData();

    if (json.server_port) {
        return json.server_port;
    }

    return SERVER_PORT;
}

LocalStorage.prototype.getMasterServerIP = function() {
    var json = getJSONPrefData();

    if (json.master_server_ip) {
        return json.master_server_ip;
    }

    return MASTER_SERVER_IP;
}

LocalStorage.prototype.getMasterServerPort = function() {
    var json = getJSONPrefData();

    if (json.master_server_port) {
        return json.master_server_port;
    }

    return MASTER_SERVER_PORT;
}

LocalStorage.prototype.setPlayerName = function(playerName) {
    var mydata = getJSONPrefData();

    mydata.player_name = playerName;

    var file = new Atomic.File(prefFilePath, Atomic.FILE_WRITE);

    // Convert the data object to a string and write it
    file.writeString(JSON.stringify(mydata));

    // close the file
    file.close();
}

LocalStorage.prototype.getPlayerName = function() {
    var json = getJSONPrefData();

    if (json.player_name) {
        return json.player_name;
    }

    return "Player";
}


Atomic.localStorage = exports.localStorage = new LocalStorage();
