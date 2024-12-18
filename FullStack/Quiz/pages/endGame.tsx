

import { useRouter } from "next/router"
import Styles from '@/styles/endGame.module.css'

export default function EndGame(){
    const router = useRouter()

    return(
        <main className={Styles.main}>
            <h1 className={Styles.titulo}>Resultado</h1>
            <div className={Styles.resultados}>
                <div className={Styles.resultadoIsolado}>
                    <div className={Styles.divResultado+' '+Styles.yellow}><p className={Styles.numeroResultado}>{router.query.respostasCertas}</p></div>
                    <p className={Styles.textoResultado}>Certas</p>
                </div>
                
                <div className={Styles.resultadoIsolado}>
                    <div className={Styles.divResultado+' '+Styles.blue}><p className={Styles.numeroResultado}>{router.query.numeroRespostas}</p></div>
                    <p className={Styles.textoResultado}>Perguntas</p>
                </div>

                <div className={Styles.resultadoIsolado}>
                    <div className={Styles.divResultado+' '+Styles.red}>
                        <p className={Styles.numeroResultado}>{
                            Math.floor(Number(router.query.respostasCertas)/Number(router.query.numeroRespostas)*100)}
                        %</p>
                    </div>
                    <p className={Styles.textoResultado}>Percentual de Acerto</p>
                </div>
            </div>
            <button className={Styles.botao} onClick={()=> router.push('./')}>Reiniciar</button>

        </main>
    )
}