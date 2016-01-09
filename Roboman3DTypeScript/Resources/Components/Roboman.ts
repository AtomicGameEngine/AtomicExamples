import AvatarController = require("./AvatarController");

// designate component
"atomic component";

//A RoboMan component
class Roboman extends Atomic.JSComponent {

    start() {

        this.animCtrl = <Atomic.AnimationController>this.node.getComponent("AnimationController");
        this.controller = <AvatarController>this.node.getJSComponent("AvatarController");

        //get main camera of the current scene
        const camera = this.node.scene.getMainCamera();
        //if it exist
        if (camera) {
            camera.node.position = [0, 0, -10];
            camera.node.pitch(20);
        }

        this.animCtrl.playExclusive("Idle", 0, true, 0.0);
        //rotate current node around Y axis
        this.node.yaw(180);
    }

    update(timeStep: number) {

        //rotate current node around Y axis
        this.node.yaw(180);

        if (this.idle != this.controller.idle) {
            this.idle = this.controller.idle;

            if (this.idle) {
                this.animCtrl.playExclusive("Idle", 0, true, 0.1);
            } else {
                this.animCtrl.playExclusive("Run", 0, true, 0.1);
            }
        }
    }

    controller: AvatarController;
    animCtrl: Atomic.AnimationController;
    idle = true;

}

export = Roboman;
