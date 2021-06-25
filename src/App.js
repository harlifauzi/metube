import React, { useEffect, useState } from 'react';
import './App.css';
import { SearchBar } from "./components";
import getYoutubePlaylistId from "get-youtube-playlist-id";
import axios from "axios";

const App = () => {
    const [ url, setUrl ] = useState("");

    const onSubmit = e => {
        e.preventDefault();
        getPlaylistDetail();
    }

    const getPlaylistDetail = () => {
        axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?key=AIzaSyAtAVSMo9Ff_52rG0XO6EI9gnaTKBwfxtc&part=contentDetails, snippet, id, status&playlistId=${getYoutubePlaylistId(url)}`)
            .then( responseAPI => {
                console.log(responseAPI);
            })
            .catch( errorAPI => console.log(errorAPI));
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
