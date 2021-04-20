import "../styles/global.scss";

//import component
import Header from "../components/Header/index"
import Player from "../components/Player/index"

import style from "../styles/app.module.scss";


function MyApp({ Component, pageProps }) {
  return (
    <div className={style.wrapper}>
      <main>
        <Header />
        <Component {...pageProps} />
      </main>
      <Player />
    </div>
  )
}

export default MyApp
