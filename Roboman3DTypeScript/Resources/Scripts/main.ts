import {DPad} from "DPad";

// called per frame, optional
export function update(timeStep:number) {
    // Handle update
}

// This script is the main entry point of the game
//Load scene
Atomic.player.loadScene("Scenes/Test.scene");

//init DPad if its a mobile platform
if (Atomic.platform == "Android" || Atomic.platform == "iOS") {
    const dpad = new DPad();
    dpad.addAll();
    dpad.init();

    const jumpView = new Atomic.UIView();

    const jumpButton = new Atomic.UIButton();
    //unset its skin, because we will use UIImageWidget
    jumpButton.skinBg = "";
    //create ours jump button image
    const jumpButtonImage = new Atomic.UIImageWidget();
    //load image
    jumpButtonImage.setImage("UI/jumpButton.png");
    //resize ours image by 2.2x
    const jumpButtonWidth = jumpButtonImage.imageWidth * 2.2;
    const jumpButtonHeight = jumpButtonImage.imageHeight * 2.2;
    //calculate position
    const posX = Atomic.graphics.width - Atomic.graphics.width / 8 - jumpButtonWidth / 2;
    const posY = Atomic.graphics.height - Atomic.graphics.height / 4 - jumpButtonHeight / 2;

    //sets jumpButton rect, specify position and end position
    jumpView.rect = [posX, posY, posX + jumpButtonWidth, posY + jumpButtonHeight];
    jumpButton.rect = [0, 0, jumpButtonWidth, jumpButtonHeight];
    //sets jumpButtonImage rect, we specify there only end position
    jumpButtonImage.rect = [0, 0, jumpButtonWidth, jumpButtonHeight];
    //adds image to jumpButton
    jumpButton.addChild(jumpButtonImage);
    //adds jumpButton to the dpad view
    jumpView.addChild(jumpButton);
    //sets jumpButton capturing to false, because we wanna make it multitouchable
    jumpButton.setCapturing(false);
    //binds jumpButton to KEY_SPACE
    Atomic.input.bindButton(jumpButton, Atomic.KEY_SPACE);
}
