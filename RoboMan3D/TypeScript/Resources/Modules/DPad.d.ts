// Type definition for DPad.js
declare module "DPad" {
    export class DPad {
        constructor();

        //init function should be called adding vertical/horizontal buttons
        //it's like we are commiting ours buttons
        init(view?: Atomic.UIView);

        //adds horizontal and vertical buttons
        addAll();

        //adds horizontal buttons
        addHorizontal();

        //adds vertical buttons
        addVertical();

        //inits layout prams for up/down buttons
        initUpDownLayoutParams();

        //inits layout params for left/right buttons
        initLeftRightLayoutParams();

        //set horizontal spacing
        setSpacingX(spacing: number);

        //set vertical spacing
        setSpacingY(spacing: number);

        //set view position
        setPosition(x: number, y: number);

        updateViewSize();

        remove();
    }
}
