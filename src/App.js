import React, { useState } from 'react';
import './App.css';
import { SearchBar, Spinner, Footer } from "./components";
import getYoutubePlaylistId from "get-youtube-playlist-id";
import axios from "axios";
import moment from "moment";

const App = () => {
    const [ url, setUrl ] = useState("");
    const [ playlistDetail, setPlaylistDetail ] = useState(null);
    const [ playlistItems, setPlaylistItems ] = useState([]);
    const [ totalDuration, setTotalDuration ] = useState("");
    const [ spinner, setSpinner ] = useState(false);

    const onSubmit = e => {
        setTotalDuration("");
        setSpinner(true);
        e.preventDefault();
        getPlaylistDetail();
    }

    const getPlaylistDetail = async () => {
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?key=AIzaSyAtAVSMo9Ff_52rG0XO6EI9gnaTKBwfxtc&part=contentDetails, snippet, id, status&playlistId=${getYoutubePlaylistId(url)}&maxResults=50`)
            .then( res => res )
            .catch( err => err );
        
        if ( response.status !== undefined ) {
            const items = response.data.items;
            setPlaylistDetail(response);
            getVideoDetail(items);
        }

        if ( response.status === undefined ){
            setSpinner(false);
            setTotalDuration("Playlist not found");
        }
    }

    const getVideoDetail = async items => {
        let durations = 0;
        let request = [];

        for ( let i = 0; i < items.length; i++ ){
            request.push(axios.get(`https://www.googleapis.com/youtube/v3/videos?key=AIzaSyAtAVSMo9Ff_52rG0XO6EI9gnaTKBwfxtc&part=snippet, contentDetails, id&id=${items[i].contentDetails.videoId}`));
        }

        const response = await Promise.all(request);

        for ( let i = 0; i < response.length; i++ ){
            const ISO8601 = response[i].data.items[0].contentDetails.duration;
            const milliseconds = moment.duration(ISO8601).asMilliseconds();
            durations += milliseconds;
        }

        setPlaylistItems(response);
        convertDuration(durations);
    }

    const convertDuration = data => {
        let days = parseInt(data / (1000 * 60 * 60 * 24), 10);
        let hours = parseInt(data % (1000 * 60 * 60 * 24) / (1000 * 60 * 60), 10);
        let minutes = parseInt(data % (1000 * 60 * 60) / (1000 * 60), 10);
        let seconds = parseInt(data % (1000 * 60) / 1000, 10);
        let result = `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;

        if (days < 10) { 
            days = '0' + days
        }
        if (hours < 10) {
            hours = '0' + hours
        }
        if (minutes < 10) {
            minutes = '0' + minutes
        }
        if (seconds < 10) {
            seconds = '0' + seconds
        }

        setTotalDuration(result);
        setSpinner(false);
    }

    return (
        <div className="app-container">
            <div className="app-dark">
                <SearchBar onSubmit={onSubmit} value={url} onChange={e => setUrl(e.target.value)} />
            </div>

            <div className="app-darker">
                { spinner && <Spinner /> }
                { totalDuration && <p className="app-darker-totalduration">{totalDuration}</p> }
                
                { playlistItems && 
                <div className="app-darker-playlistitems">
                    { playlistItems.map(( item, index ) => (
                    <div className="app-darker-playlistitem">
                        <p className="app-darker-playlistitem-number">{index+1}.</p>
                        <p className="app-darker-playlistitem-title">{item.data.items[0].snippet.title}</p>
                    </div>
                    ))}    
                </div>}
            </div>

            <Footer />
        </div>
    )
}

export default App
