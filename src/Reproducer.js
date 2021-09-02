import React, { useState } from 'react'
import { Footer } from './components/Footer'
import { Song } from './components/Song'

export const Reproducer = () => {
    const [selected, setSelected] = useState(null);
    const [songs, ] = useState([
        { "id":1, "category":"game", "name":"Mario Castle", "url":"files/mario/songs/castle.mp3" },
        { "id":2, "category":"game", "name":"Mario Star", "url":"files/mario/songs/hurry-starman.mp3"},
        { "id":3, "category":"game", "name":"Mario Overworld", "url":"files/mario/songs/overworld.mp3"}
    ])
    console.log(selected);

    function handlePlay(data) {
        if (selected === data.url) return;
        setSelected(data.url);
    }



    return (
        <div className="container">
            <div className="list-songs">
                {
                    songs.map( song => {
                        return <Song key={ song.id } data={ song } handlePlay={ handlePlay }/>
                    })
                }
            </div>
            <Footer selected={ selected } />
        </div>
    )
}
