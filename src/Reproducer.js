import React, { useState, useRef } from 'react';
import { Song } from './components/Song';

export const Reproducer = () => {
    const [songs, ] = useState([
        { "id":1, "category":"game", "name":"Mario Castle", "url":"files/mario/songs/castle.mp3" },
        { "id":2, "category":"game", "name":"Mario Star", "url":"files/mario/songs/hurry-starman.mp3"},
        { "id":3, "category":"game", "name":"Mario Overworld", "url":"files/mario/songs/overworld.mp3"}
    ]);
    const [selected, setSelected] = useState(songs[0].url);
    const [playing, setPlaying] = useState(false);

    const audio = useRef();

    function selectPlay(data) {
        if (selected === data.url && playing) {
            return;
        } else {
            audio.current.src = `https://assets.breatheco.de/apis/sound/${data.url}`;
            setSelected(data.url);
            audio.current.play();
            setPlaying(true);
        }
    }
    
    function togglePlayPause() {
        setPlaying(!playing);
        playing ? audio.current.pause() : audio.current.play();
    }

    return (
        <div className="container">
            <div className="list-songs">
                {
                    songs.map( song => {
                        return <Song key={ song.id } data={ song } handlePlay={ selectPlay }/>
                    })
                }
            </div>
            <footer>
                <i className="fas fa-step-backward controls"></i>
                {
                    playing ? 
                    <i className="fas fa-pause-circle play-control" onClick={ () => togglePlayPause() }></i>
                    :
                    <i className="fas fa-play-circle play-control" onClick={ () => togglePlayPause() }></i>
                }
                <i className="fas fa-step-forward controls"></i>
                <audio ref={ audio } hidden></audio>
            </footer>
        </div>
    )
}
