import "../styles/global.scss";

//import component
import Header from "../components/Header/index"
import Player from "../components/Player/index"

import style from "../styles/app.module.scss";
import { PlayerContextProvider } from "../contexts/PlayerContext";




function MyApp({ Component, pageProps }) {

  return (
    <PlayerContextProvider>
      <div className={style.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player></Player>
      </div>
    </PlayerContextProvider>

  )
}

export default MyApp
