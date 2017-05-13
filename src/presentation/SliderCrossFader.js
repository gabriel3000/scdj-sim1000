import React from 'react';
import {AL} from '../container/AudioLayer';

export default class SliderCrossFader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            crossfader: 50,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        });
        /*
        AL.leftXfadeGainNode.gain.value = 0.8;
        AL.rightXfadeGainNode.gain.value = 0.8;
        */
    }

    render() {
        let faderVal = this.state.crossfader;
        let leftVal = ((100-faderVal)/100)*0.8;
        let rightVal = (faderVal/100)*0.8;

        AL.leftXfadeGainNode.gain.value = leftVal;
        AL.rightXfadeGainNode.gain.value = rightVal;

        return (
            <div className="slider-container crossfader">
                <span>Cross Fader: {this.state.crossfader}</span>
                <p>leftVal:{leftVal}</p>
                <p>rightVal:{rightVal}</p>
                <div><input name="crossfader" onChange={this.handleInputChange} type="range" min="0" value={this.state.crossfader} max="100" step="1"/></div>
            </div>
        );
    }

}