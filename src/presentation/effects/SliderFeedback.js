import React from 'react';
import {AL} from '../container/AudioLayer';

export default class SliderFeedback extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            feedbackslider: 0,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        AL.feedback.gain.value = value;
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div className="slider-container">
                <span>Feedback: {this.state.feedbackslider}</span>
                <div><input name="feedbackslider" onChange={this.handleInputChange} type="range" min="0.5000" value={this.state.feedbackslider} max="0.7500" step="0.0001"/></div>
            </div>
        );
    }

}