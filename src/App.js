import React, { useState } from 'react';
import './App.css';
import { SearchBar } from "./components";
import getYoutubePlaylistId from "get-youtube-playlist-id";
import axios from "axios";
import moment from "moment";

const App = () => {
    const [ url, setUrl ] = useState("");
    const [ playlistDetail, setPlaylistDetail ] = useState(null);
    const [ playlistItems, setPlaylistItems ] = useState([]);
    const [ totalDuration, setTotalDuration ] = useState("");

    const onSubmit = e => {
        e.preventDefault();
        getPlaylistDetail();
    }

    const getPlaylistDetail = async () => {
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?key=AIzaSyAtAVSMo9Ff_52rG0XO6EI9gnaTKBwfxtc&part=contentDetails, snippet, id, status&playlistId=${getYoutubePlaylistId(url)}&maxResults=50`)
            .then( res => res )
            .catch( err => err );
        
        if ( response.status !== undefined ) {
            const totalResult = response.data.pageInfo.totalResults;
            const items = response.data.items;
            setPlaylistDetail(response);
            getVideoDetail(items, totalResult);
        }
    }

    const getVideoDetail = (items, totalResult) => {
        let durations = 0;
        items.map( (item, i) => {
            axios.get(`https://www.googleapis.com/youtube/v3/videos?key=AIzaSyAtAVSMo9Ff_52rG0XO6EI9gnaTKBwfxtc&part=snippet, contentDetails, id&id=${item.contentDetails.videoId}`)
                .then( res => {
                    setPlaylistItems([...playlistItems, res]);
                    const ISO8601 = res.data.items[0].contentDetails.duration;
                    const milliseconds = moment.duration(ISO8601).asMilliseconds();
                    durations += milliseconds;

                    if ( i  === totalResult - 1 ) convertDuration(durations);
                } )
                .catch( err => err );
        });
    }

    const convertDuration = data => {
        console.log(data);
        let days = parseInt(data / (1000 * 60 * 60 * 24));
        let hours = parseInt(data % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
        let minutes = parseInt(data % (1000 * 60 * 60) / (1000 * 60));
        let seconds = data % (1000 * 60) / 1000;

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

        setTotalDuration(`${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`);
        console.log(`${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`);
    }

    return (
        <div className="app-container">
            <div className="app-dark">
                <SearchBar onSubmit={onSubmit} value={url} onChange={e => setUrl(e.target.value)} />
            </div>
            <div className="app-darker">

            </div>
        </div>
    )
}

export default App
