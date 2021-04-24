import Image from "next/image";

import { useEffect, useRef, useState } from "react";
import Slider from "rc-slider";

import { usePlayer } from "../../contexts/PlayerContext";
import style from "./style.module.scss";
import 'rc-slider/assets/index.css';
import { convertDurationToTimeString } from "../../utils/converDurationToTimeString";
import Episode from "../../pages/episodes/[slug]";



export default function Player() {

    const audioRef = useRef(null);
    const [progress, setProgress] = useState(0);

    const {
        episodeList,
        currentEpisodeIndex,
        isPlaying,
        isLooping,
        inShuffling,
        togglePlay,
        toggleLoop,
        toggleShuffle,
        setIsPlayingState,
        playNext,
        playPrevious,
        hasNext,
        hasPrevious,
        clearPlayerState } = usePlayer();

    useEffect(() => {
        if (!audioRef.current) {
            return;
        }

        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }

    }, [isPlaying]);

    function setupProgressListener() {
        audioRef.current.currentTime = 0;

        audioRef.current.addEventListener('timeupdate', event => {
            setProgress(Math.floor(audioRef.current.currentTime))
        })
    }

    function handleSeek(amount) {
        audioRef.current.currentTime = amount;
        setProgress(amount);
    }

    function handleEpisodeEnded() {
        if(hasNext) {
            playNext();
        } else {
            clearPlayerState();
        }
    }
   

    const episode = episodeList[currentEpisodeIndex]

    return (

        <div className={style.playerContainer}>
            <header>
                <img src="playing.svg" alt="tocando agora"></img>
                <strong>Tocando agora </strong>
            </header>

            { episode ? (
                <div className={style.currentEpisode}>
                    <Image
                        width={592}
                        height={592}
                        src={episode.thumbnail}
                        objectFit="cover" >
                    </Image>
                    <strong>{episode.title}</strong>
                    <samp>{episode.members}</samp>
                </div>
            ) : (
                <div className={style.emptyPlayer}>
                    <strong>Selecione um podecast para ouvir</strong>
                </div>
            )
            }

            <footer className={!episode ? style.empty : ''}>
                <div className={style.progress}>
                    <span>{convertDurationToTimeString(progress)}</span>

                    <div className={style.slider}>
                        {episode ? (
                            <Slider
                                max={episode.duration}
                                value={progress}
                                onChange={handleSeek}
                                trackStyle={{ backgroundColor: "#04d361" }}
                                railStyle={{ backgroundColor: "#9f75ff" }}
                                handleStyle={{ borderColor: "#04d361", borderWidth: 4, }}></Slider>
                        ) : (
                            <div className={style.emptySlider} />
                        )}
                    </div>

                    <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
                </div>

                {episode && (
                    <audio
                        src={episode.url}
                        ref={audioRef}
                        loop={isLooping}
                        onEnded={handleEpisodeEnded}
                        autoPlay
                        onPlay={() => setIsPlayingState(true)}
                        onPause={() => setIsPlayingState(false)}
                        onLoadedMetadata={setupProgressListener}
                    />
                )}

                <div className={style.buttons}>
                    <button
                        type="button"
                        disabled={!episode || episodeList.length == 1}
                        onClick={toggleShuffle}
                        className={inShuffling ? style.isActive : ''}>
                        <img src="/shuffle.svg" alt="Embaralhar" />
                    </button>

                    <button type="button" onClick={playPrevious} disabled={!episode || !hasPrevious} >
                        <img src="/play-previous.svg" alt="Tocar anterior" />
                    </button>

                    <button
                        type="button"
                        className={style.playButton}
                        disabled={!episode}
                        onClick={togglePlay}>
                        {isPlaying
                            ? <img src="/pause.svg" alt="Parar" />
                            : <img src="/play.svg" alt="Tocar" />
                        }

                    </button>

                    <button type="button" onClick={playNext} disabled={!episode || !hasNext} >
                        <img src="/play-next.svg" alt="Tocar proximo" />
                    </button>

                    <button
                        type="button"
                        disabled={!episode}
                        onClick={toggleLoop}
                        className={isLooping ? style.isActive : ''}>
                        <img src="/repeat.svg" alt="Repetir" />
                    </button>
                </div>
            </footer>
        </div >
    );
}