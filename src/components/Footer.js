import React from 'react'

export const Footer = ({ selected }) => {
    return (
        <footer>
            <i class="fas fa-step-backward controls"></i>
            <i class="fas fa-play-circle play-control"></i>
            <i class="fas fa-step-forward controls"></i>
            <audio src={ selected } hidden></audio>
        </footer>
    )
}
