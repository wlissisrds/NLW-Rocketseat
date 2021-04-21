import { GetStaticProps } from "next";
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
  return (
    <div className={style.homepage}>
      <section className={style.latestEpisodes}>
        <h2>Ultimos lançamentos</h2>

        <ul>
          {latestEpisodes.map(episode => {
            return (
              <li key={episode.id}>
                <a href="">
                  {episode.title}
                </a>
              </li>
            )
          })}
        </ul>
      </section>
      <section className={style.allEpisodes}>

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
      publishedAt: episode.published_at,
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