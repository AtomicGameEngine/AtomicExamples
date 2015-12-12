//Create a new scene
var scene = Atomic.player.loadScene("Scenes/Scene.scene");
//Create a Triangle node
var triangle = scene.createChild("Triangle");
//Create CustomGeometry component
var customGeometry = triangle.createComponent("CustomGeometry");
//Set its material VColUnlit
customGeometry.setMaterial(Atomic.cache.getResource("Material", "Materials/VColUnlit.xml"));
//Begin geometry, set index to 0, and TRIANGLE_LIST mode
customGeometry.beginGeometry(0, Atomic.TRIANGLE_LIST);
//Define a vertex and a color for that
customGeometry.defineVertex([0.0, 0.5, 0.0]); //Vertex 1
customGeometry.defineColor([1.0, 0.0, 0.0]);
customGeometry.defineVertex([0.5, -0.5, 0.0]); //Vertex 2
customGeometry.defineColor([0.0, 1.0, 0.0]);
customGeometry.defineVertex([-0.5, -0.5, 0.0]);//Vertex 3
customGeometry.defineColor([0.0, 0.0, 1.0]);
//Save changes
customGeometry.commit();
//Create spinner component
triangle.createJSComponent("Components/Spinner.js");
