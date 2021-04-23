import { createContext } from "react";

type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;

}

type PlayerContextData = {
    episodeList: Array<Episode>;
    currentEpisodeIndex: number;
    play: (episode: Episode) => void;
}

//OUTRRA FORMA DE PASSAR TYPE, DIZENDO QUE TEM A MESMA ESTRUTURA
export const PlayerContext = createContext({} as PlayerContextData);