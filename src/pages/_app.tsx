import { useState } from "react";

import "../styles/global.scss";

//import component
import Header from "../components/Header/index"
import Player from "../components/Player/index"

import style from "../styles/app.module.scss";
import { PlayerContext } from "../contexts/PlayerContext";


function MyApp({ Component, pageProps }) {

const [episodeList, setEpisodeList] = useState([]);
const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
const [isPlaying, setIsPlaying] = useState(false);


function play(episode) {
  setEpisodeList([episode]);
  setCurrentEpisodeIndex(0);
  setIsPlaying(true);
}

function togglePlay() {
  setIsPlaying(!isPlaying);
}

function setIsPlayingState(state: boolean) {
    setIsPlaying(state);
}

  return (
    <PlayerContext.Provider
      value={{
        episodeList: episodeList,
        currentEpisodeIndex: currentEpisodeIndex,
        isPlaying: isPlaying,
        play, //passando a funcao por contexto
        togglePlay,
        setIsPlayingState
      }}>

      <div className={style.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player></Player>
      </div>
    </PlayerContext.Provider>
  )
}

export default MyApp
