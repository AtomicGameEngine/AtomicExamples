"use strict";
// Copyright (c) 2007 Tomas Pettersson (Original C version)
// Copyright (c) 2015 Jay Sistar (JavaScript port)
//
// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation
// files (the "Software"), to deal in the Software without
// restriction, including without limitation the rights to use,
// copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following
// conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
// HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
// WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
// OTHER DEALINGS IN THE SOFTWARE. 


function frnd(range) {
    return Math.random() * range;
}

function SFXR() {
    this.ResetParams();

    this.master_vol = 0.05;
    this.sound_vol = 0.5;

    this.playing_sample = false;
    this.phase = 0;
    this.fperiod = 0.0;
    this.fmaxperiod = 0.0;
    this.fslide = 0.0;
    this.fdslide = 0.0;
    this.period = 0;
    this.square_duty = 0.0;
    this.square_slide = 0.0;
    this.env_stage = 0;
    this.env_time = 0;
    this.env_length = new Int32Array(3);
    this.env_vol = 0.0;
    this.fphase = 0.0;
    this.fdphase = 0.0;
    this.iphase = 0;
    this.phaser_buffer = new Float32Array(1024);
    this.ipp = 0;
    this.noise_buffer = new Float32Array(32);
    this.fltp = 0.0;
    this.fltdp = 0.0;
    this.fltw = 0.0;
    this.fltw_d = 0.0;
    this.fltdmp = 0.0;
    this.fltphp = 0.0;
    this.flthp = 0.0;
    this.flthp_d = 0.0;
    this.vib_phase = 0.0;
    this.vib_speed = 0.0;
    this.vib_amp = 0.0;
    this.rep_time = 0;
    this.rep_limit = 0;
    this.arp_time = 0;
    this.arp_limit = 0;
    this.arp_mod = 0.0;

    this.vcurbutton = -1;

    this.wav_bits = 16;
    this.wav_freq = 44100;
}

SFXR.prototype.ResetParams = function() {
    this.wave_type = 0;

    this.p_base_freq = 0.3;
    this.p_freq_limit = 0.0;
    this.p_freq_ramp = 0.0;
    this.p_freq_dramp = 0.0;
    this.p_duty = 0.0;
    this.p_duty_ramp = 0.0;

    this.p_vib_strength = 0.0;
    this.p_vib_speed = 0.0;
    this.p_vib_delay = 0.0;

    this.p_env_attack = 0.0;
    this.p_env_sustain = 0.3;
    this.p_env_decay = 0.4;
    this.p_env_punch = 0.0;

    this.filter_on = false;
    this.p_lpf_resonance = 0.0;
    this.p_lpf_freq = 1.0;
    this.p_lpf_ramp = 0.0;
    this.p_hpf_freq = 0.0;
    this.p_hpf_ramp = 0.0;
    
    this.p_pha_offset = 0.0;
    this.p_pha_ramp = 0.0;

    this.p_repeat_speed = 0.0;

    this.p_arp_speed = 0.0;
    this.p_arp_mod = 0.0;
}

SFXR.prototype.LoadSettings = function(settings) {
    var i = 0;
    var data = new DataView(settings.buffer);

    var version = data.getInt32(i, true); i += 4;
    if(version != 100 && version != 101 && version != 102)
        return false;

    this.wave_type = data.getInt32(i, true); i += 4;

    this.sound_vol = 0.5;
    if(version == 102) {
        this.sound_vol = data.getFloat32(i, true); i += 4;
    }

    this.p_base_freq = data.getFloat32(i, true); i += 4;
    this.p_freq_limit = data.getFloat32(i, true); i += 4;
    this.p_freq_ramp = data.getFloat32(i, true); i += 4;
    if(version >= 101) {
        this.p_freq_dramp = data.getFloat32(i, true); i += 4;
    }
    this.p_duty = data.getFloat32(i, true); i += 4;
    this.p_duty_ramp = data.getFloat32(i, true); i += 4;

    this.p_vib_strength = data.getFloat32(i, true); i += 4;
    this.p_vib_speed = data.getFloat32(i, true); i += 4;
    this.p_vib_delay = data.getFloat32(i, true); i += 4;

    this.p_env_attack = data.getFloat32(i, true); i += 4;
    this.p_env_sustain = data.getFloat32(i, true); i += 4;
    this.p_env_decay = data.getFloat32(i, true); i += 4;
    this.p_env_punch = data.getFloat32(i, true); i += 4;

    this.filter_on = data.getUint8(i) != 0; i += 1;
    this.p_lpf_resonance = data.getFloat32(i, true); i += 4;
    this.p_lpf_freq = data.getFloat32(i, true); i += 4;
    this.p_lpf_ramp = data.getFloat32(i, true); i += 4;
    this.p_hpf_freq = data.getFloat32(i, true); i += 4;
    this.p_hpf_ramp = data.getFloat32(i, true); i += 4;

    this.p_pha_offset = data.getFloat32(i, true); i += 4;
    this.p_pha_ramp = data.getFloat32(i, true); i += 4;

    this.p_repeat_speed = data.getFloat32(i, true); i += 4;

    if(version >= 101) {
        this.p_arp_speed = data.getFloat32(i, true); i += 4;
        this.p_arp_mod = data.getFloat32(i, true); i += 4;
    }

    return true;
}

SFXR.prototype.SaveSettings = function() {
    var i = 0;

    var settings = new Uint8Array(105);
    var data = new DataView(settings.buffer);

    data.setInt32(i, 102, true); i += 4;

    data.setInt32(i, this.wave_type, true); i += 4;

    data.setFloat32(i, this.sound_vol, true); i += 4;

    data.setFloat32(i, this.p_base_freq, true); i += 4;
    data.setFloat32(i, this.p_freq_limit, true); i += 4;
    data.setFloat32(i, this.p_freq_ramp, true); i += 4;
    data.setFloat32(i, this.p_freq_dramp, true); i += 4;
    data.setFloat32(i, this.p_duty, true); i += 4;
    data.setFloat32(i, this.p_duty_ramp, true); i += 4;

    data.setFloat32(i, this.p_vib_strength, true); i += 4;
    data.setFloat32(i, this.p_vib_speed, true); i += 4;
    data.setFloat32(i, this.p_vib_delay, true); i += 4;

    data.setFloat32(i, this.p_env_attack, true); i += 4;
    data.setFloat32(i, this.p_env_sustain, true); i += 4;
    data.setFloat32(i, this.p_env_decay, true); i += 4;
    data.setFloat32(i, this.p_env_punch, true); i += 4;

    data.setUint8(i, this.filter_on ? 1 : 0); i += 1;
    data.setFloat32(i, this.p_lpf_resonance, true); i += 4;
    data.setFloat32(i, this.p_lpf_freq, true); i += 4;
    data.setFloat32(i, this.p_lpf_ramp, true); i += 4;
    data.setFloat32(i, this.p_hpf_freq, true); i += 4;
    data.setFloat32(i, this.p_hpf_ramp, true); i += 4;

    data.setFloat32(i, this.p_pha_offset, true); i += 4;
    data.setFloat32(i, this.p_pha_ramp, true); i += 4;

    data.setFloat32(i, this.p_repeat_speed, true); i += 4;

    data.setFloat32(i, this.p_arp_speed, true); i += 4;
    data.setFloat32(i, this.p_arp_mod, true); i += 4;

    return settings;
}

SFXR.prototype.ResetSample = function(restart) {
    if(!restart)
        this.phase = 0;
    this.fperiod = 100.0 / (this.p_base_freq * this.p_base_freq + 0.001);
    this.period = Math.floor(this.fperiod);
    this.fmaxperiod = 100.0 / (this.p_freq_limit * this.p_freq_limit+0.001);
    this.fslide = 1.0 - Math.pow(this.p_freq_ramp, 3.0) * 0.01;
    this.fdslide = -Math.pow(this.p_freq_dramp, 3.0) * 0.000001;
    this.square_duty = 0.5 - this.p_duty * 0.5;
    this.square_slide= -this.p_duty_ramp*0.00005;
    if(this.p_arp_mod >= 0.0)
        this.arp_mod = 1.0 - Math.pow(this.p_arp_mod, 2.0) * 0.9;
    else
        this.arp_mod = 1.0 + Math.pow(this.p_arp_mod, 2.0) * 10.0;
    this.arp_time = 0;
    this.arp_limit = Math.floor(Math.pow(1.0 - this.p_arp_speed, 2.0) * 20000 + 32);
    if(this.p_arp_speed == 1.0)
        this.arp_limit=0;
    if(!restart) {
        // reset filter
        this.fltp = 0.0;
        this.fltdp = 0.0;
        this.fltw = Math.pow(this.p_lpf_freq, 3.0) * 0.1;
        this.fltw_d = 1.0 + this.p_lpf_ramp * 0.0001;
        this.fltdmp = 5.0 / (1.0 + Math.pow(this.p_lpf_resonance, 2.0) * 20.0) * (0.01 + this.fltw);
        if(this.fltdmp > 0.8) {
            this.fltdmp = 0.8;
        }
        this.fltphp = 0.0;
        this.flthp = Math.pow(this.p_hpf_freq, 2.0) * 0.1;
        this.flthp_d = 1.0 + this.p_hpf_ramp * 0.0003;
        // reset vibrato
        this.vib_phase = 0.0;
        this.vib_speed = Math.pow(this.p_vib_speed, 2.0) * 0.01;
        this.vib_amp = this.p_vib_strength * 0.5;
        // reset envelope
        this.env_vol = 0.0;
        this.env_stage = 0;
        this.env_time = 0;
        this.env_length[0] = Math.floor(this.p_env_attack * this.p_env_attack * 100000.0);
        this.env_length[1] = Math.floor(this.p_env_sustain * this.p_env_sustain * 100000.0);
        this.env_length[2] = Math.floor(this.p_env_decay * this.p_env_decay * 100000.0);

        this.fphase = Math.pow(this.p_pha_offset, 2.0) * 1020.0;
        if(this.p_pha_offset < 0.0) this.fphase = -this.fphase;
        this.fdphase = Math.pow(this.p_pha_ramp, 2.0) * 1.0;
        if(this.p_pha_ramp < 0.0) this.fdphase = -this.fdphase;
        this.iphase = Math.floor(Math.abs(this.fphase));
        this.ipp = 0;

        var i;

        for (i = 0; i < this.phaser_buffer.length; ++i) {
            this.phaser_buffer[i] = 0.0;
        }

        for (i = 0; i < this.noise_buffer.length; ++i) {
            this.noise_buffer[i] = frnd(2.0) - 1.0;
        }
    
        this.rep_time = 0;
        this.rep_limit = Math.floor(Math.pow(1.0 - this.p_repeat_speed, 2.0) * 20000 + 32);
        if(this.p_repeat_speed == 0.0) {
            this.rep_limit = 0;
        }
    }
}

SFXR.prototype.PlaySample = function() {
    this.ResetSample(false);
    this.playing_sample = true;
}

SFXR.prototype.SynthSamples = function(buffer, numSamples, byteOffset) {
    if (!buffer) {
      return;
    }
    if (!byteOffset) {
      byteOffset = 0;
    }
    if (!numSamples) {
      return;
    }

    var byteLength = numSamples * 2;
    var data = new Int16Array(buffer, byteOffset, numSamples);
    var i;
    for(i = 0; i < numSamples; ++i) {
        if(!this.playing_sample)
            break;

        this.rep_time++;
        if(this.rep_limit != 0 && this.rep_time >= this.rep_limit) {
          this.rep_time = 0;
          this.ResetSample(true);
        }

        // frequency envelopes/arpeggios
        this.arp_time++;
        if(this.arp_limit != 0 && this.arp_time >= this.arp_limit) {
            this.arp_limit = 0;
            this.fperiod *= this.arp_mod;
        }
        this.fslide += this.fdslide;
        this.fperiod *= this.fslide;
        if(this.fperiod > this.fmaxperiod) {
            this.fperiod = this.fmaxperiod;
            if(this.p_freq_limit > 0.0) {
                this.playing_sample = false;
            }
        }
        var rfperiod = this.fperiod;
        if(this.vib_amp > 0.0) {
            this.vib_phase += this.vib_speed;
            rfperiod = this.fperiod * (1.0 + Math.sin(this.vib_phase) * this.vib_amp);
        }
        this.period = Math.floor(rfperiod);
        if(this.period < 8) this.period = 8;
        this.square_duty += this.square_slide;
        if(this.square_duty < 0.0) this.square_duty = 0.0;
        if(this.square_duty > 0.5) this.square_duty = 0.5;    
        // volume envelope
        this.env_time++;
        if(this.env_time > this.env_length[this.env_stage]) {
            this.env_time = 0;
            this.env_stage++;
            if(this.env_stage == 3) {
                this.playing_sample = false;
            }
        }
        if(this.env_stage == 0) {
            this.env_vol = this.env_time / this.env_length[0];
        }
        if(this.env_stage == 1) {
            this.env_vol = 1.0 + Math.pow(1.0 - this.env_time / this.env_length[1], 1.0) * 2.0 * this.p_env_punch;
        }
        if(this.env_stage == 2) {
            this.env_vol = 1.0 - this.env_time / this.env_length[2];
        }

        // phaser step
        this.fphase += this.fdphase;
        this.iphase = Math.floor(Math.abs(this.fphase));
        if(this.iphase > 1023) {
            this.iphase = 1023;
        }

        if(this.flthp_d != 0.0) {
            this.flthp *= this.flthp_d;
            if(this.flthp < 0.00001) {
                this.flthp = 0.00001;
            }
            if(this.flthp > 0.1) {
                this.flthp = 0.1;
            }
        }

        var ssample = 0.0;
        for(var si = 0; si < 8; ++si) { // 8x supersampling
            var sample = 0.0;
            this.phase++;
            if(this.phase >= this.period) {
                this.phase %= this.period;
                if(this.wave_type == 3) {
                    for(var ni = 0; ni < 32; ++ni) {
                        this.noise_buffer[ni] = frnd(2.0) - 1.0;
                    }
                }
            }
            // base waveform
            var fp = this.phase / this.period;
            switch(this.wave_type) {
            case 0: // square
                if(fp < this.square_duty) {
                    sample =  0.5;
                } else {
                    sample = -0.5;
                }
                break;
            case 1: // sawtooth
                sample = 1.0 - fp * 2;
                break;
            case 2: // sine
                sample = Math.sin(fp * 2 * Math.PI);
                break;
            case 3: // noise
                sample = this.noise_buffer[this.phase * 32 / this.period];
                break;
            }
            // lp filter
            var pp = this.fltp;
            this.fltw *= this.fltw_d;
            if(this.fltw < 0.0) {
                this.fltw = 0.0;
            }
            if(this.fltw > 0.1) {
                this.fltw = 0.1;
            }
            if(this.p_lpf_freq != 1.0) {
                this.fltdp += (sample - this.fltp) * this.fltw;
                this.fltdp -= this.fltdp * this.fltdmp;
            } else {
                this.fltp = sample;
                this.fltdp = 0.0;
            }
            this.fltp += this.fltdp;
            // hp filter
            this.fltphp += this.fltp - pp;
            this.fltphp -= this.fltphp * this.flthp;
            sample = this.fltphp;
            // phaser
            this.phaser_buffer[this.ipp & 1023] = sample;
            sample += this.phaser_buffer[(this.ipp - this.iphase + 1024) & 1023];
            this.ipp = (this.ipp + 1) & 1023;
            // final accumulation and envelope application
            ssample += sample * this.env_vol;
        }
        ssample = ssample / 8 * this.master_vol;

        ssample *= 2.0 * this.sound_vol;


        // clamp to [-1.0, 1.0]
        if(ssample >  1.0) ssample =  1.0;
        if(ssample < -1.0) ssample = -1.0;

        // prevent invalid values
        if(isNaN(ssample) || !isFinite(ssample)) {
            ssample = 0.0;
        }

        // write sample
        data[i] = Math.floor(ssample * 32767.0);
    }
    return i;
}

SFXR.prototype.NumSamples = function() {
    // Find the number of samples and byte length.
    var numSamples = 0;
    numSamples += Math.floor(this.p_env_attack * this.p_env_attack * 100000.0);
    numSamples += Math.floor(this.p_env_sustain * this.p_env_sustain * 100000.0);
    numSamples += Math.floor(this.p_env_decay * this.p_env_decay * 100000.0);
    return numSamples;
}

SFXR.prototype.ByteLength = function(numSamples) {
    if (numSamples === undefined) {
        numSamples = this.NumSamples();
    }
    return numSamples * this.wav_bits / 8;
}

SFXR.prototype.GenerateWAV = function() {
    // Find the number of samples and byte length.
    var numSamples = this.NumSamples();
    var length = this.ByteLength(numSamples);

    // Write a WAV header to a buffer.
    var headerBuf = new ArrayBuffer(44);
    var header = new DataView(headerBuf);
    var i = 0;
    header.setUint32(i, 0x46464952, true); i += 4; // "RIFF"
    header.setUint32(i, 36 + length, true); i += 4; // remaining file size
    header.setUint32(i, 0x45564157, true); i += 4; // "WAVE"
    header.setUint32(i, 0x20746d66, true); i += 4; // "fmt "
    header.setUint32(i, 16, true); i += 4; // chunk size
    header.setUint16(i, 1, true); i += 2; // format (1:short, 3:float (very rare))
    header.setUint16(i, 1, true); i += 2; // number of channels
    header.setUint32(i, this.wav_freq, true); i += 4; // sample rate
    header.setUint32(i, this.wav_freq * this.wav_bits / 8, true); i += 4; // bytes/sec
    header.setUint16(i, this.wav_bits / 8, true); i += 2; // block align
    header.setUint16(i, this.wav_bits, true); i += 2; // bits per sample
    header.setUint32(i, 0x61746164, true); i += 4; // "data"
    header.setUint32(i, length); i += 4; // chunk size

    // Synth all the samples, and prepend the WAV header.
    return this.SynthAllSamples(header);
}

SFXR.prototype.SynthAllSamples = function(prepend, append) {
    // write sample data
    this.PlaySample();

    // create the output buffer
    var byteOffset = 0;
    var numSamples = 0;
    numSamples += this.env_length[0];
    numSamples += this.env_length[1];
    numSamples += this.env_length[2];
    var length = numSamples * 2;
    if (!!prepend) {
        length += prepend.byteLength;
        byteOffset = prepend.byteLength;
    }
    if (!!append) {
        length += append.byteLength;
    }
    var data = new Uint8Array(length);

    // write prepended data
    if (!!prepend) {
        data.set(prepend);
    }

    // synth the samples
    this.SynthSamples(data.buffer, numSamples, byteOffset);

    // write appended data
    if (!!append) {
        data.set(append, byteOffset + (numSamples * 2));
    }

    return new Int16Array(data.buffer);
}

module.exports = SFXR;
