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
var InspectorUtils = (function () {
    function InspectorUtils() {
    }
    InspectorUtils.createSeparator = function (parent) {
        var sep = new Atomic.UISeparator();
        sep.gravity = Atomic.UI_GRAVITY_LEFT_RIGHT;
        sep.skinBg = "AESeparator";
        parent.addChild(sep);
        return sep;
    };
    InspectorUtils.createContainer = function () {
        var container = new Atomic.UIContainer();
        container.skinBg = "AEContainer";
        return container;
    };
    InspectorUtils.createAttrName = function (name) {
        var nameField = new Atomic.UITextField();
        nameField.textAlign = Atomic.UI_TEXT_ALIGN_LEFT;
        nameField.skinBg = "InspectorTextAttrName";
        nameField.text = name;
        nameField.fontDescription = InspectorUtils.attrFontDesc;
        // atttribute name layout param
        var atlp = new Atomic.UILayoutParams();
        atlp.width = 120;
        nameField.layoutParams = atlp;
        return nameField;
    };
    InspectorUtils.createEditField = function () {
        var edit = new Atomic.UIEditField();
        edit.id = "editfield";
        edit.textAlign = Atomic.UI_TEXT_ALIGN_LEFT;
        edit.skinBg = "TBAttrEditorField";
        edit.fontDescription = InspectorUtils.attrFontDesc;
        var lp = new Atomic.UILayoutParams();
        lp.width = 160;
        lp.height = 24;
        edit.layoutParams = lp;
        return edit;
    };
    InspectorUtils.createColorWidget = function () {
        var colorWidget = new Atomic.UIColorWidget();
        colorWidget.id = "colorfield";
        var lp = new Atomic.UILayoutParams();
        lp.width = 160;
        lp.height = 24;
        colorWidget.layoutParams = lp;
        return colorWidget;
    };
    InspectorUtils.createAttrEditField = function (name, parent) {
        var attrLayout = new Atomic.UILayout();
        attrLayout.layoutSize = Atomic.UI_LAYOUT_SIZE_AVAILABLE;
        attrLayout.gravity = Atomic.UI_GRAVITY_LEFT_RIGHT;
        attrLayout.layoutDistribution = Atomic.UI_LAYOUT_DISTRIBUTION_GRAVITY;
        var _name = InspectorUtils.createAttrName(name);
        attrLayout.addChild(_name);
        var edit = InspectorUtils.createEditField();
        attrLayout.addChild(edit);
        parent.addChild(attrLayout);
        return edit;
    };
    InspectorUtils.createAttrCheckBox = function (name, parent) {
        var attrLayout = new Atomic.UILayout();
        attrLayout.layoutSize = Atomic.UI_LAYOUT_SIZE_AVAILABLE;
        attrLayout.gravity = Atomic.UI_GRAVITY_LEFT_RIGHT;
        attrLayout.layoutDistribution = Atomic.UI_LAYOUT_DISTRIBUTION_GRAVITY;
        var _name = InspectorUtils.createAttrName(name);
        attrLayout.addChild(_name);
        var checkBox = new Atomic.UICheckBox();
        attrLayout.addChild(checkBox);
        parent.addChild(attrLayout);
        return { textField: _name, checkBox: checkBox };
    };
    InspectorUtils.createAttrEditFieldWithSelectButton = function (name, parent) {
        var attrLayout = new Atomic.UILayout();
        attrLayout.layoutDistribution = Atomic.UI_LAYOUT_DISTRIBUTION_POSITION_LEFT_TOP;
        if (name) {
            var _name = InspectorUtils.createAttrName(name);
            attrLayout.addChild(_name);
        }
        var fieldLayout = new Atomic.UILayout();
        fieldLayout.layoutDistribution = Atomic.UI_LAYOUT_DISTRIBUTION_POSITION_LEFT_TOP;
        var edit = InspectorUtils.createEditField();
        var selectButton = new Atomic.UIButton();
        selectButton.text = "...";
        selectButton.fontDescription = InspectorUtils.attrFontDesc;
        fieldLayout.addChild(edit);
        fieldLayout.addChild(selectButton);
        attrLayout.addChild(fieldLayout);
        parent.addChild(attrLayout);
        return { editField: edit, selectButton: selectButton };
    };
    InspectorUtils.createAttrColorFieldWithSelectButton = function (name, parent) {
        var attrLayout = new Atomic.UILayout();
        attrLayout.layoutDistribution = Atomic.UI_LAYOUT_DISTRIBUTION_POSITION_LEFT_TOP;
        if (name) {
            var _name = InspectorUtils.createAttrName(name);
            attrLayout.addChild(_name);
        }
        var fieldLayout = new Atomic.UILayout();
        fieldLayout.layoutDistribution = Atomic.UI_LAYOUT_DISTRIBUTION_POSITION_LEFT_TOP;
        var colorWidget = InspectorUtils.createColorWidget();
        var selectButton = new Atomic.UIButton();
        selectButton.text = "...";
        selectButton.fontDescription = InspectorUtils.attrFontDesc;
        fieldLayout.addChild(colorWidget);
        fieldLayout.addChild(selectButton);
        attrLayout.addChild(fieldLayout);
        parent.addChild(attrLayout);
        return { colorWidget: colorWidget, selectButton: selectButton };
    };
    InspectorUtils.createSection = function (parent, text, expanded) {
        var section = new Atomic.UISection();
        section.text = text;
        section.value = expanded;
        section.fontDescription = this.attrFontDesc;
        var layout = this.createVerticalAttrLayout();
        parent.addChild(section);
        section.contentRoot.addChild(layout);
        return layout;
    };
    InspectorUtils.createVerticalAttrLayout = function () {
        var layout = new Atomic.UILayout(Atomic.UI_AXIS_Y);
        layout.spacing = 3;
        layout.layoutPosition = Atomic.UI_LAYOUT_POSITION_LEFT_TOP;
        layout.layoutSize = Atomic.UI_LAYOUT_SIZE_AVAILABLE;
        return layout;
    };
    InspectorUtils.createApplyButton = function () {
        var button = new Atomic.UIButton();
        button.fontDescription = this.attrFontDesc;
        button.gravity = Atomic.UI_GRAVITY_RIGHT;
        button.text = "Apply";
        button.onClick = function () {
            this.onApply();
        }.bind(this);
        return button;
    };
    return InspectorUtils;
}());
InspectorUtils.Ctor = (function () {
    var fd = InspectorUtils.attrFontDesc = new Atomic.UIFontDescription();
    fd.id = "Vera";
    fd.size = 11;
})();
module.exports = InspectorUtils;
