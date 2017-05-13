import React from 'react';
import {AL} from '../container/AudioLayer';

export default class BasicAudioControls extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            freqslider: 1,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        let buttonName = event.target.name;
        let playerId = this.props.playerId;
        let trackId = this.props.trackId;
        AL.controls(buttonName,playerId,trackId);
    }

    render() {
        return (
            <div className="slider-container">
                <button name="playPause" onClick={this.handleInputChange}>Play/Pause</button>
                <button name="cue" onClick={this.handleInputChange}>Cue In/Out</button>
                <button name="BeginLoop" onClick={this.handleInputChange}>Cue Begining</button>
            </div>
        );
    }

}