"atomic component";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Component that will rotate a node at a configurable speed.
 */
var Spinner = (function (_super) {
    __extends(Spinner, _super);
    function Spinner() {
        var _this = _super.apply(this, arguments) || this;
        /**
         * Fields witihin the inspectorFields object will be exposed to the editor
         */
        _this.inspectorFields = {
            speed: 1.0
        };
        return _this;
    }
    /**
     * Update called every cycle with timeStep containing the delta between calls
     * @param  {number} timeStep time since last call to update
     */
    Spinner.prototype.update = function (timeStep) {
        this.node.rotate2D(this.speed * timeStep * 75.0);
    };
    return Spinner;
}(Atomic.JSComponent));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Spinner;
