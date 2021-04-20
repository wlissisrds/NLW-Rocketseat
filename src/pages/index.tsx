//SPA
//SSR

import { useEffect } from "react"

//SSG
export default function Home(props) {
  console.log(props.episodes)
  return (
    <>
    index
    </>
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


  //SSR
  /*esse nume na função faz o next entender que precisa executar essa função
  antes de exibir o conteudo da pagina pro usuário*/
  /*export  async function getServerSideProps() {
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
  export  async function getStaticProps() {
    const response = await fetch("http://localhost:3333/episodes");
    const data = await response.json();

    return {
      props: { //props é nome obrigatorio alem do nome da funcao
        episodes: data, //pode ser qualquer nome
      },
      revalidate: 60 * 60 * 8 //nesse caso em 8 em 8 horas
    }
  }