import React from 'react';
import './YoutubeEmbed.css';
import ReactPlayer from 'react-player';

const YoutubeEmbed = ({ id }) => {
    return (
        <ReactPlayer 
            className="youtubeembed-reactplayer"
            url='https://www.youtube.com/watch?v=9boMnm5X9ak?showinfo=0&enablejsapi=1&origin=http://localhost:3000'
        />
    )
}

export default YoutubeEmbed
