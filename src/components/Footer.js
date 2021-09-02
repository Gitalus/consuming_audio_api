import React, { useEffect, useRef } from 'react'

export const Footer = ({ selected }) => {
    let audio = useRef(null);
    useEffect(() => {
        audio.current.src= selected ? `https://assets.breatheco.de/apis/sound/${selected}` : null;
    }, [selected])
    return (
        <footer>
            <i className="fas fa-step-backward controls"></i>
            <i className="fas fa-play-circle play-control"></i>
            <i className="fas fa-step-forward controls"></i>
            <audio ref={ audio } hidden autoPlay></audio>
        </footer>
    )
}
