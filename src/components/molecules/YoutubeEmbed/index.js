import React from 'react';
import PropTypes from 'prop-types';
import './YoutubeEmbed.css';

const YoutubeEmbed = ({ id }) => {
    return (
        <div className="youtubeembed-container">
            <iframe
                width="853"
                height="480"
                src={`https://www.youtube.com/embed/9boMnm5X9ak`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
            />
        </div>
    )
}

YoutubeEmbed.propTypes = {
    id: PropTypes.string.isRequired
};

export default YoutubeEmbed
