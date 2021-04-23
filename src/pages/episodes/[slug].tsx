//Roteamento com next
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

import { api } from '../../services/api';
import { convertDurationToTimeString } from '../../utils/converDurationToTimeString';

import style from "./episode.module.scss";

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

type EpisodeProps = {
    //aray de objetos
    episode: Episode
}

//[pode ser qulquer nome].tsx esse arquivo recebe como parametro oa rotas do navegador
export default function Episode({ episode }: EpisodeProps) {


    return (
        <div className={style.episode}>
            <div className={style.thumbnailContainer}>
                <Link href="/">
                    <button type="button">
                        <img src="/arrow-left.svg" alt="Voltar" />
                    </button>
                </Link>
                <Image
                    width={700}
                    height={160}
                    src={episode.thumbnail}
                    objectFit="cover">
                </Image>
                <button type="button">
                    <img src="/play.svg" alt="Tocar episodio" />
                </button>
            </div>

            <header>
                <h1>{episode.title}</h1>
                <span>{episode.members}</span>
                <span>{episode.publishedAt}</span>
                <span>{episode.durationAsString}</span>
            </header>

            <div
                className={style.description}
                dangerouslySetInnerHTML={{ __html: episode.description }}
            />
        </div>

    )

}

//QUAIS EPISODIOS EU QUERO GERAR DE FORMA ESTÁTICA NO MOMENTO DA BUILD
//Obrigatorio em paginas staticas-dinamicas SSG
export const getStaticPaths: GetStaticPaths = async () => {

    const {data} = await api.get("episodes", {
        params:{
            _limit: 2,
            _sort: "published_at",
            _order: "desc"
        }
    })

    const paths = data.map(episode => {
        return {
            params: {
                slug: episode.id
            }
        }
    }) 

    return {
        paths: paths,
        fallback: "blocking"
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
    const { slug } = context.params;
    const { data } = await api.get(`/episodes/${slug}`);

    const episode = {
        id: data.id,
        title: data.title,
        thumbnail: data.thumbnail,
        members: data.members,
        publishedAt: new Date(data.published_at).toLocaleDateString('pt-BR'),
        duration: Number(data.file.duration),
        durationAsString: convertDurationToTimeString(Number(data.file.duration)),
        description: data.description,
        url: data.file.url
    }

    return {
        props: {
            episode,
        },
        revalidate: 60 * 60 * 24 //atualiza acada 24 hora

    }
}