/// <reference path="../TypeScript/Atomic.d.ts"/>
/// <reference path="../TypeScript/AtomicWork.d.ts" />
"atomic component";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Roboman = (function (_super) {
    __extends(Roboman, _super);
    function Roboman() {
        _super.apply(this, arguments);
    }
    Roboman.prototype.start = function () {
        var node = this.node;
        this.animCtrl = node.getComponent("AnimationController");
        this.controller = node.getJSComponent("AvatarController");
        this.animCtrl.playExclusive("Idle", 0, true, 0.0);
    };
    Roboman.prototype.update = function (timeStep) {
        if (this.controller.idle)
            this.animCtrl.playExclusive("Idle", 0, true, 0.1);
        else
            this.animCtrl.playExclusive("Run", 0, true, 0.1);
    };
    return Roboman;
})(Atomic.JSComponent);
module.exports = Roboman;
