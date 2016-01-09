"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// designate component
"atomic component";
//A RoboMan component
var Roboman = (function (_super) {
    __extends(Roboman, _super);
    function Roboman() {
        _super.apply(this, arguments);
        this.idle = true;
    }
    Roboman.prototype.start = function () {
        this.animCtrl = this.node.getComponent("AnimationController");
        this.controller = this.node.getJSComponent("AvatarController");
        //get main camera of the current scene
        var camera = this.node.scene.getMainCamera();
        //if it exist
        if (camera) {
            camera.node.position = [0, 0, -10];
            camera.node.pitch(20);
        }
        this.animCtrl.playExclusive("Idle", 0, true, 0.0);
        //rotate current node around Y axis
        this.node.yaw(180);
    };
    Roboman.prototype.update = function (timeStep) {
        //rotate current node around Y axis
        this.node.yaw(180);
        if (this.idle != this.controller.idle) {
            this.idle = this.controller.idle;
            if (this.idle) {
                this.animCtrl.playExclusive("Idle", 0, true, 0.1);
            }
            else {
                this.animCtrl.playExclusive("Run", 0, true, 0.1);
            }
        }
    };
    return Roboman;
}(Atomic.JSComponent));
module.exports = Roboman;
