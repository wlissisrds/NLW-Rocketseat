import style from "./style.module.scss";

export default function Header() {
    const  options = { weekday: 'short', month: 'long', day: 'numeric' };
    const currentDate = new Date().toLocaleDateString('pt-BR', options);

    return (
        <header className={style.headerContainer}>
            <img src="/logo.svg" alt="Podcastr"></img>
            <p>O melhor  para voce ouvir, sempre</p>
            <span>{currentDate}</span>
        </header>
    );
}