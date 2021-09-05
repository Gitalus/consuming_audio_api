import React, { useState, useRef, useEffect } from 'react';
import { handleMusic } from './helper';
import { useFetch } from './hooks/useFetch';

export const Reproducer = () => {
    const [current, setCurrent] = useState(0);
    const [playing, setPlaying] = useState(false);
    const songs = useFetch();
    const [repeat, setRepeat] = useState(false);
    const [shuffle, setShuffle] = useState(false);
    
    const audio = useRef();

    useEffect(() => {
        if (songs) {
            audio.current.src = `https://assets.breatheco.de/apis/sound/${songs[0].url}`;
        }
    }, [songs])

    const { selectPlay, nextSong, prevSong, togglePlayPause } = handleMusic({ songs, current, setCurrent, playing, setPlaying, audio, repeat, shuffle });

    return (
        <div className="container">
            <div className="list-songs custom-scroll">
                {
                    !!songs &&
                    songs.map( ( song, idx ) => {
                        return <div key={idx} className={"songs" + (playing && current === idx ? " active" : "") + ( audio.current?.currentTime !== 0 && current === idx && !playing ? " paused" : "")} onClick={ () => selectPlay(idx)}>
                                    <span className="nSong">{idx + 1}</span>{ song.name }
                                </div>
                    })
                }
            </div>
            <footer>
                <i className={"far fa-random controls" + (shuffle ? " active-icon" : "")} onClick={ () => {
                                                                                                            setShuffle(!shuffle);
                                                                                                        }}></i>
                <i className="fas fa-step-backward controls" onClick={ () => prevSong() }></i>
                {
                    playing ? 
                    (<i className="fas fa-pause-circle play-control" onClick={ () => togglePlayPause() }></i>
                    ):(<i className="fas fa-play-circle play-control" onClick={ () => togglePlayPause() }></i>)
                }
                <i className="fas fa-step-forward controls" onClick={ nextSong }></i>
                <i className={"far fa-repeat-alt controls" + (repeat ? " active-icon" : "")} onClick={ () => {
                                                                                                            setRepeat(!repeat);
                                                                                                            audio.current.loop = !audio.current.loop;
                                                                                                        }}></i>
                <audio ref={ audio } hidden onEnded={() => nextSong() }></audio>
                <i className="fal fa-volume-up"></i>
            </footer>
        </div>
    )
}
