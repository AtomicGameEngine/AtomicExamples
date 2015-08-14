
// TypeScript inheritance Component

'atomic component';

/// <reference path="../TypeScript/Atomic.d.ts" />

class Spinner extends Atomic.JSComponent {

    update(timeStep:number) {

        this.node.yaw(timeStep * 75 * this.speed);

    }

    speed:number = 1;

    // define inspector fields
    inspectorFields = {
        speed: 1.0
    }

}

export = Spinner;
