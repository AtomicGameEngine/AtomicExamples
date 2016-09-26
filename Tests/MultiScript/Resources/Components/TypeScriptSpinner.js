// TypeScript inheritance Component
'atomic component';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../TypeScript/Atomic.d.ts" />
var Spinner = (function (_super) {
    __extends(Spinner, _super);
    function Spinner() {
        _super.apply(this, arguments);
        this.speed = 1;
        this.inspectorFields = {
            speed: 1.0
        };
    }
    Spinner.prototype.update = function (timeStep) {
        this.node.yaw(timeStep * 75 * this.speed);
    };
    return Spinner;
})(Atomic.JSComponent);
module.exports = Spinner;
