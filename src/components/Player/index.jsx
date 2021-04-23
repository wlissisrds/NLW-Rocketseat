import Image from "next/image";

import { useContext, useEffect, useRef } from "react";
import Slider from "rc-slider";

import { PlayerContext } from "../../contexts/PlayerContext";
import style from "./style.module.scss";
import 'rc-slider/assets/index.css';



export default function Player() {

    const audioRef = useRef(null);

    const {
        episodeList,
        currentEpisodeIndex,
        isPlaying,
        togglePlay,
        setIsPlayingState} = useContext(PlayerContext);

    useEffect(() => {
        if (!audioRef.current) {
            return;
        }

        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }

    }, [isPlaying])

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
                    <span>00:00</span>

                    <div className={style.slider}>
                        {episode ? (
                            <Slider
                                trackStyle={{ backgroundColor: "#04d361" }}
                                railStyle={{ backgroundColor: "#9f75ff" }}
                                handleStyle={{ borderColor: "#04d361", borderWidth: 4, }}></Slider>
                        ) : (
                            <div className={style.emptySlider} />
                        )}
                    </div>

                    <span>00:00</span>
                </div>

                {episode && (
                    <audio
                        src={episode.url}
                        ref={audioRef}
                        autoPlay
                        onPlay={()=> setIsPlayingState(true)}
                        onPause={()=> setIsPlayingState(false)}
                    />
                )}

                <div className={style.buttons}>
                    <button type="button" disabled={!episode}>
                        <img src="/shuffle.svg" alt="Embaralhar" />
                    </button>

                    <button type="button" disabled={!episode}>
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

                    <button type="button" disabled={!episode}>
                        <img src="/play-next.svg" alt="Tocar proximo" />
                    </button>

                    <button type="button" disabled={!episode}>
                        <img src="/repeat.svg" alt="Repetir" />
                    </button>
                </div>
            </footer>
        </div >
    );
}