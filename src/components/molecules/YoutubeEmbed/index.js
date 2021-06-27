import React from 'react';
// import './YoutubeEmbed.css';
import ReactPlayer from 'react-player';

const YoutubeEmbed = ({ id }) => {
    return (
        <div className="youtubeembed-container">
            {/* <iframe
                width="853"
                height="480"
                src={`https://www.youtube.com/embed/9boMnm5X9ak`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
            /> */}
            <ReactPlayer 
                url='https://www.youtube.com/watch?v=9boMnm5X9ak?showinfo=0&enablejsapi=1&origin=http://localhost:3000' 
                controls={true} 
            />
        </div>
    )
}

export default YoutubeEmbed
