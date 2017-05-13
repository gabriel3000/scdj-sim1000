import React from 'react';
import {AL} from '../container/AudioLayer';

export default class SliderDelay extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            delayslider: 0,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        AL.delay.delayTime.value = value;
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div className="slider-container">
                <span>Delay: {this.state.delayslider}</span>
                <div><input name="delayslider" onChange={this.handleInputChange} type="range" min="0.0100" value={this.state.delayslider} max="1.0000" step="0.0001"/></div>
            </div>
        );
    }

}