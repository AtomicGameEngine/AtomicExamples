"atomic component";
var __extends = (this && this.__extends) || function (d, b) {for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];function __() { this.constructor = d; };__.prototype = b.prototype;d.prototype = new __();};
function $bind(n,u){if(null==u)return null;var e;return null==e&&(e=function(){return e.method.apply(e.scope,arguments)},e.scope=n,e.method=u),e};
var PhysicsDebug = (function(_super) {
__extends(PhysicsDebug, _super);
function PhysicsDebug () {
	Atomic.JSComponent.call(this);
};
PhysicsDebug.prototype.start = function() {
	var debug = this.scene.getComponent("DebugRenderer");
	var world = this.scene.getComponent("PhysicsWorld2D");
	this.subscribeToEvent("PostRenderUpdate",function(_) {
		world.drawDebugGeometry();
	});
};
return PhysicsDebug;
})(Atomic.JSComponent);
module.exports = PhysicsDebug;
