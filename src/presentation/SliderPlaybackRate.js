import React from 'react';
import {AL} from '../container/AudioLayer';

export default class SliderPlaybackRate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            freqslider: 1,
            updatedduration: "normal"

        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const playbackrate = event.target.value;
        const name = event.target.name;
        const duration = AL.samples[this.props.trackId].buffer.duration;
        const updatedduration = (duration / playbackrate);
        AL.samples[this.props.trackId].newDuration = updatedduration;
        AL.samples[this.props.trackId].playbackRate.value = playbackrate;

        this.setState({
            [name]: playbackrate,
            updatedduration: AL.samples[this.props.trackId].newDuration
        });
    }

    render() {
        return (
            <div className="slider-container">
                <span>Playback Rate: {this.state.freqslider} <br/>
                      Track Duration: {this.state.updatedduration}
                </span>
                <div><input name="freqslider" onChange={this.handleInputChange} type="range" id="weight" min="0.1000" value={this.state.freqslider} max="2.0000" step="0.0001"/></div>
            </div>
        );
    }

}