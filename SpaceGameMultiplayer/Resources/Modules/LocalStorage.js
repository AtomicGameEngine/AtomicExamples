var PREFS_FILE = "SpaceGameMultiPlayer.json";


var filesystem = Atomic.getFileSystem();

// Get out documents folder
var documentsDir = filesystem.getUserDocumentsDir();

function LocalStorage() {
    print('In LocalStorage constructor');
}

function getJSONPrefData() {
    var fullPath = documentsDir + PREFS_FILE;

    if (filesystem.fileExists(fullPath)) {
        var file = new Atomic.File(fullPath, Atomic.FILE_READ);

        // Read the data string and parse the JSON back to an object
        var fileData = file.readString();

        var json = JSON.parse(fileData);

        return json;
    }

    return {};
}

LocalStorage.prototype.setServerName = function(serverName) {
    
}

LocalStorage.prototype.getServerName = function() {
    print('Getting server name!');

    var json = getJSONPrefData();
    
    if (json.server_name) {
        return json.server_name;
    }

    return "Server";
}

function setPlayerName(playerName) {

}

LocalStorage.prototype.getPlayerName = function() {
    print('Getting player name!');

    var json = getJSONPrefData();
    
    if (json.server_name) {
        return json.server_name;
    }

    return "Player";
}


Atomic.localStorage = exports.localStorage = new LocalStorage();

