// local vs session vs cookie

// DEBUG IN FF. AUDIO DESTINATION IS NOT MATCHING WITH THE GAIN NODE
// TWO GAIN NODES ARE BEING MADE WE ONLY NEED ONE FOR NOW.
// CONNECTIONS ARE FLAWED

import Global from "./SCDJ-Global";
class AudioLayer {
    constructor() {
        let config = new Global();
        this.AudioContext = new(window.AudioContext || window.webkitAudioContext)();
        this.ScUserId = config.ScUserId;
        this.ScClientId = config.ScClientId;
        this.ScRedirectURI = config.ScRedirectURI;
        this.samples = {};
        this.player = 0;
        this.startOfLoop = true;
        this.createMasterGainNode(this);
        this.loopActive = false;
        this.loopIn = 0;
        this.loopOut = 0;
        this.startedAt = null;
        this.pausedAt = null;
        this.paused = true;
    }

    createMasterGainNode(AL){
        AL.masterGainNode = AL.AudioContext.createGain();
        AL.masterGainNode.gain.value = 0.8;
        AL.masterGainNode.connect(AL.AudioContext.destination);
    }

    updateTrack(trackObj){

        if(this.samples.length > 0){
            this.samples[this.player].disconnect(this.masterGainNode);
        }
    

        const streamUrl = trackObj.stream_url;
        const trackId = trackObj.id;

        let sample;
        let AudioLayer = this;
        let request = new XMLHttpRequest();
    
    
        request.open("GET", streamUrl+"?client_id="+AL.ScClientId+"&allow_redirects=False", true);
        request.responseType = "arraybuffer";
        request.onload = function(){
            AudioLayer.AudioContext.decodeAudioData(request.response, function(buffer){
                sample = AudioLayer.AudioContext.createBufferSource();
                sample.buffer = buffer;
                sample.loop = true
                sample.loopStart = 0;
                sample.loopEnd = 0;
                sample.playbackRate.value = 1;
                //AudioLayer.samples.sampleBuffer = sample;
                AudioLayer.samples[trackId] = sample;
                //AudioLayer[playerId] = sample;
                console.log(sample);
                console.log(trackId);
                AudioLayer.trackLoaded(trackId);
            });
        };
        request.send();
    }


    trackLoaded(trackId){
        let gain = this.masterGainNode;
        let trackSelection;

        this.player = trackId;
        trackSelection = this.player;

        this.samples[trackSelection].connect(gain);

        console.log("this.samples[trackSelection]: "+this.samples[trackSelection]);
    }


    controls(buttonName,trackId){
        let gain = this.masterGainNode;
        let reffrenceBuffer = this.samples[trackId];

        if(buttonName == "playPause"){
            //First Play
            if(this.paused){
                this.paused = false;
                if(this.pausedAt){
                    this.startedAt = Date.now() - this.pausedAt;
                    reffrenceBuffer.start(0, this.pausedAt / 1000);
                    console.log("post initial play: "+this.pausedAt / 1000);
                    //console.log("initial play: " + reffrenceBuffer.context.currentTime);
                }else{
                    this.startedAt = Date.now();
                    reffrenceBuffer.start(0);
                    console.log("initial play");
                }
            }else{
                reffrenceBuffer.stop();
                this.pausedAt = Date.now() - this.startedAt;
                this.paused = true;
                console.log("pause");
                //console.log("Paused at: " + reffrenceBuffer.context.currentTime);
            }
        }
        if(buttonName == "cue"){
            if(this.loopActive){
                reffrenceBuffer.stop();
                let newBuff = this.AudioContext.createBufferSource();
                this.loopOut = Date.now() - this.startedAt;
                newBuff.buffer = reffrenceBuffer.buffer;
                newBuff.playbackRate.value = reffrenceBuffer.playbackRate.value;
                newBuff.connect(gain);
                this.samples[trackId] = newBuff;
                newBuff.loop = true;
                console.log("loopIn:  "+this.loopIn / 1000);
                console.log("loopOut:  "+this.loopOut / 1000);
                newBuff.loopStart = this.loopIn / 1000;
                newBuff.loopEnd = this.loopOut / 1000;
                newBuff.start(0,this.loopIn);
                this.loopActive = false;
            }else{
                this.loopIn = Date.now() - this.startedAt;
                this.loopActive = true;
            }
        }
        if(buttonName == "BeginLoop"){
            reffrenceBuffer.stop();
            let newBuff = this.AudioContext.createBufferSource();
            newBuff.buffer = reffrenceBuffer.buffer;
            newBuff.playbackRate.value = reffrenceBuffer.playbackRate.value;
            newBuff.connect(gain);
            this.samples[trackId] = newBuff;
            newBuff.loop = true;
            newBuff.loopStart = this.loopIn / 1000;
            newBuff.loopEnd = this.loopOut / 1000;
            console.log(newBuff);
            console.log("loopIn: "+this.loopIn / 1000);
            console.log("loopOut: "+this.loopOut / 1000);

            newBuff.start(0,this.loopIn);
        }
    }
}
export let AL = new AudioLayer();

    // createEffects(trackId,gain){
    //     let delay = AL.AudioContext.createDelay();
    //     delay.delayTime.value = 0;

    //     let feedback = AL.AudioContext.createGain();
    //     feedback.gain.value = 0;

    //     let filter = AL.AudioContext.createBiquadFilter();
    //     filter.frequency.value = 0;

    //     delay.connect(feedback);
    //     feedback.connect(filter);
    //     filter.connect(delay);

    //     AL.samples[trackId].connect(delay);
    //     delay.connect(gain);

    //     AL.delay = delay;
    //     AL.feedback = feedback;
    //     AL.filter = filter;
    // }


        //previouslyPlaying = this.samples[trackId];