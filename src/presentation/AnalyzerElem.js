import React from 'react';
import {AN} from '../container/Analyzer.js';

export default class AnalyzerElem extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.updateCanvas(this.props.waveformUrl);
    }
    componentDidUpdate() {
        this.updateCanvas(this.props.waveformUrl);
    }
    updateCanvas(imgUrl) {
        let img = new Image;
        img.onload = () => {
        	let ctx = this.refs.canvas.getContext("2d");
        	//AN.initAnimation()
			//AN.initAnimation(this.refs.canvas,ctx,img);
        }
        img.src = imgUrl;
    }

    render() {
        return (
            <div>
                <canvas ref="canvas" id={"canvas__"+this.props.playerId} className="analyzer" width="400" height="150"/>
            </div>
        );
    }
}