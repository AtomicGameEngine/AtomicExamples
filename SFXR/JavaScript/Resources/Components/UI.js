"atomic component";

var SFXR = require("SFXR");

var component = function (self) {

    self.buttons = [];
    self.workQueue = [];
    self.sounds = [];

    self.createButton = function(name) {
        var button = new Atomic.UIButton();
        button.fontId = "Vera";
        button.fontSize = 30;
        button.text = name;
        button.gravity = Atomic.UI_GRAVITY_LEFT_RIGHT;
        button.layoutWidth = 350;
        button.layoutHeight = 50;
        button.opacity = 1.0;
        return button;
    }

    self.startGeneratingAtomicSound = function(name, doneCB, progressCB) {
        // Guard callbacks
        if (!doneCB) {
            doneCB = function() {};
        }
        if (!progressCB) {
            progressCB = function() {};
        }

        // Create the generator
        var sfxr = new SFXR();

        // Load the sound
        // (Because this is a resource file, we assume that this can't fail.)
        var settings = Atomic.cache.getFile("Sounds/" + name + ".sfs").readBinary();
        sfxr.LoadSettings(settings);
        sfxr.PlaySample();
        var numSamples = sfxr.NumSamples();
        var samplesGenerated = 0;

        // Create the buffer
        var buf = new Int16Array(numSamples);

        var update = function(timestep) {
            // Generate some of the samples (only a few, so that we don't go over 1 frame time).
            var numSamplesToGenerateThisFrame = 0x100;
            if ((numSamplesToGenerateThisFrame + samplesGenerated) > numSamples) {
                numSamplesToGenerateThisFrame = numSamples - samplesGenerated;
            }
            sfxr.SynthSamples(buf.buffer, numSamplesToGenerateThisFrame, samplesGenerated * 2);
            samplesGenerated += numSamplesToGenerateThisFrame;
            if (samplesGenerated === numSamples) {
                // Create the sound
                var sound = new Atomic.Sound();
                sound.setFormat(sfxr.wav_freq, true, false); // 16-bit Mono
                sound.setData(buf);
                progressCB(1.0);
                doneCB(sound);
                return false;
            } else {
                progressCB(samplesGenerated / numSamples);
                return true;
            }
        }

        return update;
    }

    self.start = function() {
        // SFXR filenames (assumed to be in resources)
        self.soundSettingFilenames = [
            "Coin",
            "Implosion",
            "Deflect"
        ];

        // Create a SoundSource for playing the sounds.
        self.soundSource = self.node.createComponent("SoundSource");
        self.soundSource.soundType = Atomic.SOUND_EFFECT;
        self.soundSource.gain = 1.0;

        // Get the view and layout setup.
        self.uiView = new Atomic.UIView();
        self.uiLayout = new Atomic.UILayout();
        self.uiLayout.rect = self.uiView.rect;
        self.uiLayout.axis = Atomic.UI_AXIS_Y;
        self.uiLayout.layoutPosition = Atomic.UI_LAYOUT_POSITION_GRAVITY;
        self.uiView.addChild(self.uiLayout);

        self.soundSettingFilenames.forEach(function(name) {
            console.log("Loading \"" + name + "\"");
            var button = self.createButton(name);
            button.opacity = 0.1;
            self.uiLayout.addChild(button);
            self.buttons.push(button);

            var oneFrameOfWork = self.startGeneratingAtomicSound(name, function(sound) {
                // Make the button fully opaque.
                button.opacity = 1.0;
                button.text = name;
                console.log("Done loading \"" + name + "\"");

                // Make the button play the sound when it is clicked.
                button.onClick = function() {
                    console.log("Playing \"" + name + "\"");
                    self.soundSource.play(sound);
                };
            }, function(progress) {
                // Make the button as opaque as the progress.
                button.opacity = progress;
                button.text = name + " " + Math.floor(progress * 100) + "%";
            });

            self.workQueue.push(oneFrameOfWork);
        });
    }

    self.update = function(timeStep) {
        if (self.workQueue.length !== 0) {
            var more = self.workQueue[0](timeStep);
            if (!more) {
                self.workQueue.shift();
            }
        }
    }
}

exports.component = component;
