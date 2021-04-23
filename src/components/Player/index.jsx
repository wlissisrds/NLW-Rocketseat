import { useContext } from "react";
import { PlayerContext } from "../../contexts/PlayerContext";
import style from "./style.module.scss";

export default function Player() {
    const player = useContext(PlayerContext);

    return (

        <div className={style.playerContainer}>
            <header>
                <img src="playing.svg" alt="tocando agora"></img>
                <strong>Tocando agora {player}</strong>
            </header>

            <div className={style.emptyPlayer}>
                <strong>Selecione um podecast para ouvir</strong>
            </div>

            <footer className={style.empty}>
                <div className={style.progress}>
                    <span>00:00</span>

                    <div className={style.slider}>
                        <div className={style.emptySlider} />
                    </div>
                    
                    <span>00:00</span>
                </div>

                <div className={style.buttons}>
                    <button type="button">
                        <img src="/shuffle.svg" alt="Embaralhar" />
                    </button>

                    <button type="button">
                        <img src="/play-previous.svg" alt="Tocar anterior" />
                    </button>

                    <button type="button">
                        <img src="/play.svg" alt="Tocar" />
                    </button>

                    <button type="button" className={style.playButton}>
                        <img src="/play-next.svg" alt="Tocar proximo" />
                    </button>

                    <button type="button" >
                        <img src="/repeat.svg" alt="Repetir" />
                    </button>
                </div>
            </footer>
        </div>
    );
}