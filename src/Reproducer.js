import React, { useState, useRef, useEffect } from 'react';
import { handleMusic } from './helper';

export const Reproducer = () => {
    const [songs] = useState([
        { "id":1, "category":"game", "name":"Mario Castle", "url":"files/mario/songs/castle.mp3" },
        { "id":2, "category":"game", "name":"Mario Star", "url":"files/mario/songs/hurry-starman.mp3"},
        { "id":3, "category":"game", "name":"Mario Overworld", "url":"files/mario/songs/overworld.mp3"}
    ]);
    const [current, setCurrent] = useState(0);
    const [playing, setPlaying] = useState(false);

    const audio = useRef();
    
    useEffect(() => {
        audio.current.src = `https://assets.breatheco.de/apis/sound/${songs[current].url}`;
    }, [])

    const { selectPlay, nextSong, prevSong, togglePlayPause } = handleMusic(songs, current, setCurrent, playing, setPlaying, audio);

    return (
        <div className="container">
            <div className="list-songs">
                {
                    songs.map( ( song, idx ) => {
                        return <div className={"songs" + (playing && current === idx ? " active" : "")} onClick={ () => selectPlay(idx)}>
                                    <span className="nSong">{idx + 1}</span>{ song.name }
                                </div>
                    })
                }
            </div>
            <footer>
                <i className="fas fa-step-backward controls" onClick={ () => prevSong() }></i>
                {
                    playing ? 
                    (<i className="fas fa-pause-circle play-control" onClick={ () => togglePlayPause() }></i>
                    ):(<i className="fas fa-play-circle play-control" onClick={ () => togglePlayPause() }></i>)
                }
                <i className="fas fa-step-forward controls" onClick={ () => nextSong() }></i>
                <audio ref={ audio } hidden></audio>
            </footer>
        </div>
    )
}
