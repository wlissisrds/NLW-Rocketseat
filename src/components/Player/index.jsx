import Image from "next/image";

import { useContext } from "react";
import Slider from "rc-slider";
import 'rc-slider/assets/index.css';

import { PlayerContext } from "../../contexts/PlayerContext";
import style from "./style.module.scss";

export default function Player() {
    const { episodeList, currentEpisodeIndex } = useContext(PlayerContext);

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

                <div className={style.buttons}>
                    <button type="button" disabled={!episode}>
                        <img src="/shuffle.svg" alt="Embaralhar" />
                    </button>

                    <button type="button" disabled={!episode}>
                        <img src="/play-previous.svg" alt="Tocar anterior" />
                    </button>

                    <button type="button" className={style.playButton} disabled={!episode}>
                        <img src="/play.svg" alt="Tocar" />
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