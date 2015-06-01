

// Get the FileSystem subsystem
var filesystem = Atomic.getFileSystem();

// Get out documents folder
var documentsDir = filesystem.getUserDocumentsDir();

// Make a data object
var mydata = {
	name: "Josh",
	lifeTheUniverseAndEverything: 42
}

// Open a file in write mode
var file = new Atomic.File(documentsDir + "AtomicGameEngineTest.json", Atomic.FILE_WRITE);

// Convert the data object to a string and write it
file.writeString(JSON.stringify(mydata));

// close the file
file.close();

// reopen the file in read mode
file = new Atomic.File(documentsDir + "AtomicGameEngineTest.json", Atomic.FILE_READ);

// Read the data string and parse the JSON back to an object
var json = JSON.parse(file.readString());

// verify that our results are correct
assert(json.name == "Josh");
assert(json.lifeTheUniverseAndEverything == 42);

// Success
print("Success");

// Exit the example
Atomic.getEngine().exit();
