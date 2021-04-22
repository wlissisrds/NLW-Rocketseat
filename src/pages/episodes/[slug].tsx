//Roteamento com next
import {useRouter} from 'next/router'

export default function () {
    const router = useRouter();
    
    //[pode ser qulquer nome].tsx esse arquivo recebe como parametro oa rotas do navegador
    return (

        <h1>{router.query.slug}</h1>
    )

}