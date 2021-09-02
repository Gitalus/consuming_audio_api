import React from 'react'

export const Footer = ({ selected }) => {
    return (
        <footer>
            <i className="fas fa-step-backward controls"></i>
            <i className="fas fa-play-circle play-control"></i>
            <i className="fas fa-step-forward controls"></i>
            <audio src={ selected ? `https://assets.breatheco.de/apis/sound/${selected}` : null} hidden ></audio>
        </footer>
    )
}
