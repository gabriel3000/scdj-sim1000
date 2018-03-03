import React from 'react';
import {AL} from '../container/AudioLayer';

export default class SliderGain extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            gainslider: 0.8
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        });
    }

    render() {
        let gainNode = AL.masterGainNode;
        gainNode.gain.value = this.state.gainslider;

        return (
            <div className="slider-container">
                <span>Gain: {this.state.gainslider}</span>
                <div className="slider-container__gain">
                    <input className="slider-container__gain--slider" name="gainslider" onChange={this.handleInputChange} type="range" id="weight" min="0" value={this.state.gainslider} max="0.8" step="0.0001"/>
                </div>
            </div>
        );
    }
}