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
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ScriptWidget = require("./ScriptWidget");
var InspectorUtils = require("./InspectorUtils");
var AnimationBlenderInspector = (function (_super) {
    __extends(AnimationBlenderInspector, _super);
    function AnimationBlenderInspector() {
        var _this = _super.call(this) || this;
        var fd = _this.attrFontDesc = new Atomic.UIFontDescription();
        fd.id = "Vera";
        fd.size = 11;
        var nlp = new Atomic.UILayoutParams();
        nlp.width = 310;
        var layout = _this.rootLayout = new Atomic.UILayout();
        layout.spacing = 4;
        layout.layoutDistribution = Atomic.UI_LAYOUT_DISTRIBUTION_GRAVITY;
        layout.layoutPosition = Atomic.UI_LAYOUT_POSITION_LEFT_TOP;
        layout.layoutParams = nlp;
        layout.axis = Atomic.UI_AXIS_Y;
        _this.gravity = Atomic.UI_GRAVITY_ALL;
        _this.addChild(layout);
        _this.subscribeToEvent(_this, "WidgetEvent", function (data) { return _this.handleWidgetEvent(data); });
        return _this;
    }
    AnimationBlenderInspector.prototype.inspect = function (asset) {
        this.asset = asset;
        this.exampleData = this.readJsonFile(asset.path);
        // node attr layout
        var rootLayout = this.rootLayout;
        // Blender Section
        var defaultLayout = InspectorUtils.createSection(rootLayout, "ExampleData: " + asset.name, 1);
        this.populateInspector(defaultLayout);
    };
    AnimationBlenderInspector.prototype.populateInspector = function (layout) {
        var NameEdit = InspectorUtils.createAttrEditField("Name", layout);
        NameEdit.tooltip = "The name of your custom animaiton State.";
        NameEdit.text = this.exampleData.Name;
        var AgeEdit = InspectorUtils.createAttrEditField("Age", layout);
        AgeEdit.tooltip = "The name of your custom animaiton State.";
        AgeEdit.text = this.exampleData.Age;
        var Identity = InspectorUtils.createAttrEditField("Age", layout);
        Identity.tooltip = "The name of your custom animaiton State.";
        Identity.text = this.exampleData.Identity.toString();
    };
    AnimationBlenderInspector.prototype.readJsonFile = function (pathName) {
        var env = ToolCore.toolEnvironment;
        this.file = new Atomic.File(pathName, Atomic.FILE_READWRITE);
        if (!this.file.isOpen()) {
            return null;
        }
        var json = JSON.parse(this.file.readText());
        var projectTemplate = json;
        return projectTemplate;
    };
    return AnimationBlenderInspector;
}(ScriptWidget));
module.exports = AnimationBlenderInspector;
