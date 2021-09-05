import React, { useState, useRef, useEffect } from 'react';
import { handleMusic } from './helper';
import { useFetch } from './hooks/useFetch';

export const Reproducer = () => {
    const [current, setCurrent] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [repeat, setRepeat] = useState(false);
    const [shuffle, setShuffle] = useState(false);
    const [currentTime, setCurrentTime] = useState(0)

    const songs = useFetch(); // Promise to fetch the song list, null by default
    
    const audioPlayer = useRef();
    const progressBar = useRef();
    const animationRef = useRef(); // reference animation of thumb in progressBar
    
    const { selectPlay, nextSong, prevSong, togglePlayPause } = handleMusic({ 
        songs, 
        current, 
        setCurrent,
        playing, 
        setPlaying, 
        audioPlayer, 
        repeat, 
        shuffle,
        animationRef,
        whilePlaying
    });

    useEffect(() => {
        if (songs) {
            audioPlayer.current.src = `https://assets.breatheco.de/apis/sound/${songs[0].url}`;
            audioPlayer.current.currentTime = currentTime;
            changePlayerCurrentTime();
        }
    }, [songs])

    useEffect(() => {
        const seconds = Math.floor(audioPlayer.current.duration);
        progressBar.current.max = seconds;
    }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState])


    function whilePlaying() {
        progressBar.current.value = audioPlayer.current.currentTime;
        changePlayerCurrentTime();
        animationRef.current = requestAnimationFrame(whilePlaying);
    }

    function changeRange() {
        audioPlayer.current.currentTime = progressBar.current.value;
        changePlayerCurrentTime();
    }

    function changePlayerCurrentTime() {
        progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / progressBar.current.max * 100}%`);
        setCurrentTime(progressBar.current.value);
    }

    return (
        <div className="container">
            <div className="list-songs custom-scroll">
                {
                    !!songs &&
                    songs.map( ( song, idx ) => {
                        return <div key={idx} className={"songs" + (playing && current === idx ? " active" : "") + ( audioPlayer.current?.currentTime !== 0 && current === idx && !playing ? " paused" : "")} onClick={ () => selectPlay(idx)}>
                                    <span className="nSong">{idx + 1}</span>{ song.name }
                                </div>
                    })
                }
            </div>
            <footer>
                <div className="progress-container">
                    <input type="range" className="progress-bar" defaultValue="0" ref={ progressBar } onChange={ changeRange } />
                </div>
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
                                                                                                            audioPlayer.current.loop = !audioPlayer.current.loop;
                                                                                                        }}></i>
                <audio ref={ audioPlayer } hidden onEnded={() => nextSong() }></audio>
                <i className="fal fa-volume-up"></i>
            </footer>
        </div>
    )
}
