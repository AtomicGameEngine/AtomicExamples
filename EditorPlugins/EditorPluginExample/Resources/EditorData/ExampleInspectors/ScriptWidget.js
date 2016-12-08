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
var ScriptWidget = (function (_super) {
    __extends(ScriptWidget, _super);
    function ScriptWidget() {
        var _this = _super.call(this) || this;
        // JS way of binding method
        // this.subscribeToEvent(this, "WidgetEvent", this.handleWidgetEvent.bind(this));
        // TypeScript-ey
        _this.subscribeToEvent(_this, "WidgetEvent", function (data) { return _this.handleWidgetEvent(data); });
        return _this;
    }
    ScriptWidget.prototype.onEventClick = function (target, refid) {
        return false;
    };
    ScriptWidget.prototype.handleWidgetEvent = function (ev) {
        if (ev.type == Atomic.UI_EVENT_TYPE_CLICK) {
            return this.onEventClick(ev.target, ev.refid);
        }
    };
    return ScriptWidget;
}(Atomic.UIWidget));
module.exports = ScriptWidget;
