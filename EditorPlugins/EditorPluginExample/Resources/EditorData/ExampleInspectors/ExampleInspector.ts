//
// Copyright (c) 2014-2016 THUNDERBEAST GAMES LLC
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
//

import ScriptWidget = require("./ScriptWidget");
import InspectorUtils = require("./InspectorUtils");

class AnimationBlenderInspector extends ScriptWidget {

    constructor() {

        super();

        var fd = this.attrFontDesc = new Atomic.UIFontDescription();
        fd.id = "Vera";
        fd.size = 11;

        var nlp = new Atomic.UILayoutParams();
        nlp.width = 310;

        var layout = this.rootLayout = new Atomic.UILayout();
        layout.spacing = 4;

        layout.layoutDistribution = Atomic.UI_LAYOUT_DISTRIBUTION_GRAVITY;
        layout.layoutPosition = Atomic.UI_LAYOUT_POSITION_LEFT_TOP;
        layout.layoutParams = nlp;
        layout.axis = Atomic.UI_AXIS_Y;

        this.gravity = Atomic.UI_GRAVITY_ALL;
        this.addChild(layout);

        this.subscribeToEvent(this, "WidgetEvent", (data) => this.handleWidgetEvent(data));

    }

    inspect(asset: ToolCore.Asset) {

        this.asset = asset;

        this.exampleData = this.readJsonFile(asset.path);

        // node attr layout
        var rootLayout = this.rootLayout;

        // Blender Section
        var defaultLayout = InspectorUtils.createSection(rootLayout, "ExampleData: " + asset.name, 1);

        this.populateInspector(defaultLayout);

    }

    populateInspector(layout: Atomic.UILayout) {

        var NameEdit = InspectorUtils.createAttrEditField("Name", layout);
        NameEdit.tooltip = "The name of your custom animaiton State.";
        NameEdit.text = this.exampleData.Name;

        var AgeEdit = InspectorUtils.createAttrEditField("Age", layout);
        AgeEdit.tooltip = "The name of your custom animaiton State.";
        AgeEdit.text = this.exampleData.Age;

        var Identity = InspectorUtils.createAttrEditField("Age", layout);
        Identity.tooltip = "The name of your custom animaiton State.";
        Identity.text = this.exampleData.Identity.toString();

    }


    readJsonFile(pathName: string): ExampleData {

        var env = ToolCore.toolEnvironment;

        this.file = new Atomic.File(pathName, Atomic.FILE_READWRITE);

        if (!this.file.isOpen()) {
            return null;
        }

        let json = JSON.parse(this.file.readText());

        let projectTemplate = <ExampleData>json;

        return projectTemplate;
    }

    asset: ToolCore.Asset;
    rootLayout: Atomic.UILayout;
    attrFontDesc: Atomic.UIFontDescription;
    exampleData: ExampleData;
    file: Atomic.File;
}
export = AnimationBlenderInspector;

interface ExampleData {
    Name: string;
    Age: string;
    Identity: number;
}

