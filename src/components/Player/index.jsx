import style from "./style.module.scss";

export default function Player() {
    return (
        <header className={style.headerContainer}>
            <img src="/logo.svg" alt="Podcastr"></img>
            <p>O melhor  para voce ouvir, sempre</p>
            <span>{currentDate}</span>
        </header>
    );
}