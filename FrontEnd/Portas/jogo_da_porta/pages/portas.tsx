import Porta from './components/porta'
import Styles from '../styles/portas.module.css'
import { useState, useEffect } from 'react'

/*icones*/
import { GrRefresh } from "react-icons/gr"; // Importa o ícone `GrRefresh` da biblioteca
import { IoHomeSharp } from "react-icons/io5"; // Importa o ícone `IoHomeSharp` da biblioteca
/*icones*/

import { useRouter } from 'next/router'

export default function Portas(){
    const router = useRouter()
    
    const numPortas:number = Number(router.query.numDoors)
    const [portaSelecionada, setPortaSelecionada] = useState(0) 
    const [portaComPresente, setPortaComPresente] = useState(0) 
    const portas= []
    const [numPortasAbertas,setNumPortasAbertas] = useState(0)
    const [fecharPortas, setFecharPortas] = useState(false)
    const tempoParaFechar = 20 // Tempo inicial que demora para fechar as portas
    const [mensagem, setMensagem] = useState('Selecione sua porta e encontre o presente!')
    
    useEffect(() => { //Resolve o problema de não setar o presente ao recarregar a página
        if (router.isReady) { // verifica se o router já foi carregado
            setPortaComPresente(Math.floor(Math.random() * numPortas + 1)); //Coloca o presente em uma porta aleatoria 
        }
    }, [router.isReady]);

    function incrementaNumPortasAbertas(index:number){ //Será chamada pela tag filha quando for aberta

        setNumPortasAbertas(numPortasAbertas+1)
        if(index == portaComPresente){
            if((numPortas - numPortasAbertas) == 1){
                setMensagem('Parabéns!! Você venceu.')
            }else{
                setMensagem('Você Perdeu! Mais sorte da próxima.')
            }
        }
    }

    function mudaSelecionada(numeroIndex:number){
        setPortaSelecionada(numeroIndex)
        console.log('Porta Selecionada ' + numeroIndex)
    }

    function reiniciar(){
        setPortaSelecionada(0)
        setNumPortasAbertas(0)
        setMensagem('Encontre o Presente')
        setFecharPortas(true); // Atualiza o estado

        setTimeout(() => {
            setFecharPortas(false); // Reverte o estado após um curto período para simular "reiniciar"
        }, 100);

        setTimeout(() => { //Espera as portas fecharem para colocar o presente em uma porta aleatoria
            setPortaComPresente(Math.floor(Math.random() * numPortas + 1))
        }, 450);

    }

    for (let index = 1; index <= numPortas; index++) {
        portas.push(
        <Porta selecionada = {
            index == portaSelecionada ? true: false}
            numero = {index}
            comPresente = {portaComPresente == index? true: false} 
            funcaoSelecionada = {mudaSelecionada}
            incrementaNumPortasAbertas = {incrementaNumPortasAbertas}
            key = {index}

            /*Se a porta estiver selecionada  e tiver mais de uma porta fechada bloqueia, tambem bloquei se não têm nenhuma porta selecionada a abertura dessa porta*/
            bloqueiaAbertura = {(index == portaSelecionada && numPortas - numPortasAbertas > 1) || portaSelecionada == 0 /*Essa subtração retorna o numero de portas fechadas*/} 
            fechar = {fecharPortas}
            tempoParaFechar = {tempoParaFechar*index} // Gera um efeito de fechar uma porta de cada vez
        ></Porta>
        )
    }

    
    return(
        <div style={{display:'flex', flexDirection:'column', justifyContent:'center', width:'100%', height:'100%'}}>
            <h1 className={Styles.mensagem}>{mensagem}</h1>
        <div className={Styles.divMain}>
            {portas}
        </div>
            <button className = {Styles.botaoReiniciar} onClick={reiniciar}> <GrRefresh/> </button>
            <button className = {Styles.botaoHome} onClick={() => {router.push('./')}}> <IoHomeSharp />  </button>

        </div>

    );
}