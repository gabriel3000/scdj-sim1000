import React from 'react';

export default class TrackListItem extends React.Component {
    render() {
        let trackData = this.props.trackData;
        //console.log(trackData);
        return (
            <div className={this.props.active ? "selected tracklistitem" : "tracklistitem"} onClick={this.props.onClick}>
                <div className="trackthumb">
                    <img src={trackData.artwork_url} />
                </div>
                <div className="trackinfo">
                    <p className="tracktitle">{this.props.trackData.user.username ? this.props.trackData.user.username : "LOADING..."}</p>
                    <span className="trackdescription">{this.props.trackData.title}</span>
                </div>
            </div>
        );
    }

}