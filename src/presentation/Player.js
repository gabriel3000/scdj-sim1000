import React from 'react';
import SliderPlaybackRate from './SliderPlaybackRate';
import BasicAudioControls from './BasicAudioControls';
import SliderGain from './SliderGain';
import {AL} from '../container/AudioLayer';

export default class Player extends React.Component {
    constructor(props) {
        super(props);
    }

    buildPlayerInfo(trackInfoObj,trackData){
        if(trackData != null){
            trackInfoObj.trackname = trackData.title;
            trackInfoObj.trackId = trackData.id;
            trackInfoObj.waveform = trackData.waveform_url;
        }
    }

    componentWillMount(){
        console.log("Player Component Will Mount");
    }

    componentDidMount(){
        console.log("Player Component Did Mount");
    }

    render() {
        try {
        let playercontent = <div><h4>please select a track</h4></div>
        let trackInfoObj = {};
        

        this.buildPlayerInfo(trackInfoObj,this.props.playerTrackSelection);


        if(trackInfoObj.trackId){
            playercontent = <div>
            <h4>{trackInfoObj.trackname}</h4>
            <BasicAudioControls trackId={trackInfoObj.trackId}/>
            <SliderPlaybackRate trackId={trackInfoObj.trackId}/>
            <SliderGain trackId={trackInfoObj.trackId}/>
            </div>
        }

        return (
            <div className="playercontent">
                {playercontent}
            </div>
        );
        }
        catch(err){
            console.log(err);
        }
    }
}