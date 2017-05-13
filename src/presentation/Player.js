import React from 'react';
import SliderPlaybackRate from './SliderPlaybackRate';
import BasicAudioControls from './BasicAudioControls';
import SliderGain from './SliderGain';
import AnalyzerElem from './AnalyzerElem';
import {AL} from '../container/AudioLayer';

export default class Player extends React.Component {
    constructor(props) {
        super(props);
    }

    buildPlayerInfo(trackInfoObj,trackData){
        trackInfoObj.trackname = trackData.title;
        trackInfoObj.trackId = trackData.id;
        trackInfoObj.waveform = trackData.waveform_url;
    }

    render() {
        let playercontent = <div><h4>please select a track</h4></div>
        let trackInfoObj = {};
        
        if(this.props.player1TrackSelection){
            this.buildPlayerInfo(trackInfoObj,this.props.player1TrackSelection);
        }else if(this.props.player2TrackSelection){
            this.buildPlayerInfo(trackInfoObj,this.props.player2TrackSelection);
        }

        if(trackInfoObj.trackId){
            playercontent = <div className={this.props.playerId}>
            <h4>{trackInfoObj.trackname}</h4>
            <BasicAudioControls playerId={this.props.playerId} trackId={trackInfoObj.trackId}/>
            <SliderPlaybackRate playerId={this.props.playerId} trackId={trackInfoObj.trackId}/>
            <SliderGain playerId={this.props.playerId} trackId={trackInfoObj.trackId}/>
            </div>
        }

        return (
            <div className="playercontent">
                {playercontent}
            </div>
        );
    }
}