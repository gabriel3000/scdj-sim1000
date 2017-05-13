import React from 'react';
import {AL} from '../container/AudioLayer';

export default class SliderCutoffFrequency extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cutofffreqslider: 0,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        AL.filter.frequency.value = value;
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div className="slider-container">
                <span>Cuttoff: {this.state.cutofffreqslider}</span>
                <div><input name="cutofffreqslider" onChange={this.handleInputChange} type="range" min="1500" value={this.state.cutofffreqslider} max="4000" step="20"/></div>
            </div>
        );
    }

}