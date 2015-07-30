/// <reference path="../TypeScript/Atomic.d.ts"/>
/// <reference path="../TypeScript/AtomicWork.d.ts" />

"atomic component";

import AvatarController = require("./AvatarController");

class Roboman extends Atomic.JSComponent {

    start() {

        var node = this.node;

        this.animCtrl = <Atomic.AnimationController> node.getComponent("AnimationController");
        this.controller = <AvatarController> node.getJSComponent("AvatarController");

        this.animCtrl.playExclusive("Idle", 0, true, 0.0);

    }

    update(timeStep: number) {

        if (this.controller.idle)
            this.animCtrl.playExclusive("Idle", 0, true, 0.1);
        else
            this.animCtrl.playExclusive("Run", 0, true, 0.1);

    }

    controller: AvatarController;
    animCtrl: Atomic.AnimationController;

}

export = Roboman;
