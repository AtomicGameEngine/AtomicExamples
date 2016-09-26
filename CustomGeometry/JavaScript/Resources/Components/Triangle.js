'atomic component';

//Triangle component
exports.component = function(self) {
    self.start = function() {
        //Create a CustomGeometry component
        var customGeometry = self.node.createComponent("CustomGeometry");

        //Set it material to VColUnlit
        customGeometry.setMaterial(Atomic.cache.getResource("Material", "Materials/VColUnlit.xml"));

        //Begin geometry, set index to 0, and TRIANGLE_LIST mode
        customGeometry.beginGeometry(0, Atomic.TRIANGLE_LIST);

        //Define a vertex and a color for that
        customGeometry.defineVertex([0.0, 0.5, 0.0]); //Vertex 1
        customGeometry.defineColor([1.0, 0.0, 0.0]);

        customGeometry.defineVertex([0.5, -0.5, 0.0]); //Vertex 2
        customGeometry.defineColor([0.0, 1.0, 0.0]);

        customGeometry.defineVertex([-0.5, -0.5, 0.0]); //Vertex 3
        customGeometry.defineColor([0.0, 0.0, 1.0]);

        //Save changes
        customGeometry.commit();
    };
};
