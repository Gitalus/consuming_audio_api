

export function handleMusic( songs, current, setCurrent, playing, setPlaying, audio ) {

    function selectPlay(idx) {
        if (current === idx && playing) {
            return;
        }
        audio.current.src = `https://assets.breatheco.de/apis/sound/${songs[idx].url}`;
        audio.current.play();
        setCurrent(idx);
        setPlaying(true);
    }

    function nextSong() {
        if (current === songs.length - 1) {
            audio.current.src = `https://assets.breatheco.de/apis/sound/${songs[0].url}`;
            audio.current.play();
            setPlaying(true);
            setCurrent(0);
        } else {
            audio.current.src = `https://assets.breatheco.de/apis/sound/${songs[current + 1].url}`;
            audio.current.play();
            setPlaying(true);
            setCurrent(current + 1);
        }
    }
    
    function prevSong() {
        if (current === 0) {
            audio.current.src = `https://assets.breatheco.de/apis/sound/${songs[songs.length - 1].url}`;
            audio.current.play();
            setPlaying(true);
            setCurrent(songs.length - 1);
        } else {
            audio.current.src = `https://assets.breatheco.de/apis/sound/${songs[current - 1].url}`;
            audio.current.play();
            setPlaying(true);
            setCurrent(current - 1);
        }
    }

    function togglePlayPause() {
        if (current !== null) {
            setPlaying(!playing);
            playing ? audio.current.pause() : audio.current.play();
        }
    }

    return { selectPlay, nextSong, prevSong, togglePlayPause }
}