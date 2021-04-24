import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";

import { usePlayer } from "../contexts/PlayerContext";
import { api } from "../services/api";
import { convertDurationToTimeString } from "../utils/converDurationToTimeString";

//style
import style from "./home.module.scss";

type Episode = {
  id: string,
  title: string,
  thumbnail: string,
  description: string,
  members: string,
  duration: number,
  durationAsString: string,
  url: string
  publishedAt: string,
}

type HomeProps = {
  //aray de objetos
  latestEpisodes: Array<Episode>,
  allEpisodes: Array<Episode>
}

export default function Home({ latestEpisodes, allEpisodes }: HomeProps) {
  const { playList } = usePlayer();

  const episodeList = [...latestEpisodes, ...allEpisodes];

  return (
    <div className={style.homepage}>
      <section className={style.latestEpisodes}>
        <h2>Ultimos lançamentos</h2>

        <ul>
          {latestEpisodes.map((episode, index) => {
            return (
              <li key={episode.id}>
                <img
                  width={192}
                  height={192}
                  src={episode.thumbnail}
                  alt={episode.title}
                />

                <div className={style.episodesDetails}>
                  <Link href={`/episodes/${episode.id}`}>
                    <a >{episode.title}</a>
                  </Link>
                  <p>{episode.members}</p>
                  <span>{episode.publishedAt}</span>
                  <span>{episode.durationAsString}</span>
                </div>

                <button type="button" onClick={() => playList(episodeList, index)}>
                  <img src="/play-green.svg" alt="Tocar episódio" />
                </button>
              </li>
            )
          })}
        </ul>
      </section>
      <section className={style.allEpisodes}>
        <h2>Todos episódios</h2>

        <table cellSpacing={0}>
          <thead>
            <tr>
              <th></th>
              <th>Podcast</th>
              <th>integrantes</th>
              <th>data</th>
              <th>duracao</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allEpisodes.map((episode, index) => {
              return (
                <tr key={episode.id}>
                  <td style={{ width: 72 }}>
                    <Image
                      width={120}
                      height={120}
                      src={episode.thumbnail}
                      alt={episode.title}
                      objectFit="cover"
                    />
                  </td>
                  <td>
                    <Link href={`/episodes/${episode.id}`}>
                      <a >{episode.title}</a>
                    </Link>
                  </td>
                  <td>{episode.members}</td>
                  <td>{episode.publishedAt}</td>
                  <td>{episode.durationAsString}</td>
                  <td>
                    <button type="button" onClick={() => playList(episodeList, index + latestEpisodes.length)}>
                      <img src="/play-green.svg" alt="Tocar episódio" />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>

        </table>
      </section>
    </div>

  )
}

/*//SPA - sempre vai ser carregada uma requisição a cada refresh da pagina
  //nota: essa função dispara algo sempre que algo mudar na aplicação
  //oque eu quero executar, e quando[], array vazio dispara uma unica vez
  useEffect(()=>{
    fetch("http://localhost:3333/episodes")
    .then(response => response.json())
    .then(data => console.log(data))
  },[]);*/


/*//SSR
esse nume na função faz o next entender que precisa executar essa função
antes de exibir o conteudo da pagina pro usuário
export  async function getServerSideProps() {
  const response = await fetch("http://localhost:3333/episodes");
  const data = await response.json();

  return {
    props: { //props é nome obrigatorio alem do nome da funcao
      episodes: data, //pode ser qualquer nome
    }
  }
}*/

/*SSG a unica coisa que muda é o nome da função e o objeto de retorno,
 que agra possue o 
 REVALIDATE (numero em segundos de quanto tempo eu quero gerar uma nova versao dessa pagina)*/
export const getStaticProps: GetStaticProps = async () => {

  //paramtros da request usando AXIOS
  const { data } = await api.get("episodes", {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  });

  /*FORMATANDO OS DADOS DA API FORA DO COMPONENTE
  PARA EVITAR PROBLEMAS NA HORA DO CARREGAMENTO*/

  const episodes = data.map(episode => {

    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: new Date(episode.published_at).toLocaleDateString('pt-BR'),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
      description: episode.description,
      url: episode.file.url
    };
  })

  //cortanto o arrai de episodes
  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.length)


  return {
    props: { //props é nome obrigatorio alem do nome da funcao
      latestEpisodes,
      allEpisodes
    },
    revalidate: 60 * 60 * 8 //nesse caso em 8 em 8 horas
  }
}