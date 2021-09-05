

export function handleMusic({ songs, current, setCurrent, playing, setPlaying, audioPlayer, repeat, shuffle, animationRef, whilePlaying }) {

    function selectPlay(idx) {
        if (current === idx && playing) {
            return;
        }
        audioPlayer.current.src = `https://assets.breatheco.de/apis/sound/${songs[idx].url}`;
        audioPlayer.current.play();
        animationRef.current = requestAnimationFrame(whilePlaying);
        setCurrent(idx);
        setPlaying(true);
    }

    function nextSong(e = null) {
        if (repeat && e === null) return;
        else if (shuffle) {
            shuffleSong();
        }
        else if (current === songs.length - 1) {
            audioPlayer.current.src = `https://assets.breatheco.de/apis/sound/${songs[0].url}`;
            audioPlayer.current.play();
            animationRef.current = requestAnimationFrame(whilePlaying);
            setPlaying(true);
            setCurrent(0);
        } else {
            audioPlayer.current.src = `https://assets.breatheco.de/apis/sound/${songs[current + 1].url}`;
            audioPlayer.current.play();
            animationRef.current = requestAnimationFrame(whilePlaying);
            setPlaying(true);
            setCurrent(current + 1);
        }
    }
    
    function prevSong() {
        if (shuffle) {
            shuffleSong();
        }
        else if (current === 0) {
            audioPlayer.current.src = `https://assets.breatheco.de/apis/sound/${songs[songs.length - 1].url}`;
            audioPlayer.current.play();
            animationRef.current = requestAnimationFrame(whilePlaying);
            setPlaying(true);
            setCurrent(songs.length - 1);
        } else {
            audioPlayer.current.src = `https://assets.breatheco.de/apis/sound/${songs[current - 1].url}`;
            audioPlayer.current.play();
            animationRef.current = requestAnimationFrame(whilePlaying);
            setPlaying(true);
            setCurrent(current - 1);
        }
    }

    function togglePlayPause() {
        if (songs === null) return;
        setPlaying(!playing);
        if (playing) {
            audioPlayer.current.pause(); 
            cancelAnimationFrame(animationRef.current);
        } else {
            audioPlayer.current.play();
            animationRef.current = requestAnimationFrame(whilePlaying);
        }
    }

    function shuffleSong() {
        let randomValue = Math.floor(Math.random() * songs.length);
        audioPlayer.current.src = `https://assets.breatheco.de/apis/sound/${songs[randomValue].url}`;
        animationRef.current = requestAnimationFrame(whilePlaying);
        audioPlayer.current.play();
        setPlaying(true);
        setCurrent(randomValue);
    }

    return { selectPlay, nextSong, prevSong, togglePlayPause }
}