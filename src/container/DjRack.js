import React from 'react';
import SC from "soundcloud";
import TrackListItem from "../presentation/TrackListItem";
import Scorpion from "../presentation/Scorpion";
import Player from "../presentation/Player";
import TogglePlayerButton from '../presentation/TogglePlayerButton';
import {AL} from './AudioLayer';
import Global from "./SCDJ-Global";
class DjRack extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeIndex: null,
            tracks: [],
            tracksLoaded: false,
            loadMoreURL: null,
            playerTrackSelection:null
        };
    }

    handleTrackClick(index,i){
        console.log(this.state.tracks[index]);
        this.setState({
            activeIndex:index,
            playerTrackSelection:this.state.tracks[index],
        });
        AL.updateTrack(this.state.tracks[index]);
    }

    handleLoadMoreClick(button){
        let TL = this
        let xmlhttp = new XMLHttpRequest();
        let TRACKS = this.state.tracks;
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
                if (xmlhttp.status == 200) {
                    let page = JSON.parse(xmlhttp.responseText);
                    let TRACKSMERGED = [...TRACKS,...page.collection];
                    console.log(TRACKSMERGED);
                    TL.setState({
                        tracks:TRACKSMERGED,
                        loadMoreURL:page.next_href
                    });
                }
                else if (xmlhttp.status == 400) {
                    console.log('There was an error 400');
                }
                else {
                    console.log('something else other than 200 was returned');
                }
            }
        };
        xmlhttp.open("GET",this.state.loadMoreURL, true);
        xmlhttp.send();
    }

    handlePlayerSelection(index,i){
        this.setState({playerActive:index});
    }

    componentDidMount(){
        let TL = this;
        let page_size = 60;
        let partition = 1;
        let config = new Global();


        SC.initialize({
            client_id: config.ScClientId,
            redirect_uri: config.ScRedirectURI
        });
        SC.get("/users/"+"27119007"+"/favorites", { limit: page_size, linked_partitioning: partition }).then(function(tracksReturn){
            TL.setState({
                tracks:tracksReturn.collection,
                loadMoreURL:tracksReturn.next_href,
                tracksLoaded:true
            });
        });
    }
    render() {
        let samplerContent = null;
        if(this.state.tracksLoaded){
            samplerContent = <div className="rack">
                <div className="tracklistwrap">
                    <div className="tracklist">
                        {this.state.tracks.map(
                            (value, i) => (
                                <TrackListItem
                                    active={this.state.activeIndex === i}
                                    key={i}
                                    onClick={this.handleTrackClick.bind(this,i)}
                                    trackData={value} />
                            )
                        )}
                        <button onClick={this.handleLoadMoreClick.bind(this)}>LOAD MORE</button>
                    </div>
                </div>
                <div className="playerswrap">
                    <div className="players">
                        <Player playerTrackSelection={this.state.playerTrackSelection}/>
                    </div>
                </div>
            </div>
        }else{
            samplerContent = <Scorpion />
        }

        return (
            <div className="container">
                {samplerContent}
            </div>
        );
    }
}

export default DjRack