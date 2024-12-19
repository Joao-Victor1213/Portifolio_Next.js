/* eslint-disable */



import Questao from "../modelos/Questao";
import { useState } from "react";
import { useEffect } from "react";
import Resposta from "../modelos/Resposta";
import  Styles  from '@/styles/quizApp.module.css';
import { useRouter } from "next/router";
import { useRef } from "react";

export function getServerSideProps(){
  return{
    props:{
    }
  }
}

export default function Quiz(){

    const urlOriginal = "/api/retornaQuestao"
    const tempoParaResposta =  10
    
    const router = useRouter()
    const [questao, setQuestao] = useState<Questao>()
    const [questoesRespondidas, setQuestoesRespondidas] = useState<Questao[]>([])
    const [tempo, setTempo] = useState<number>(tempoParaResposta)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [carregando, setCarregando] = useState(true)
    function endGame(){

        let respostasCertas = 0
        let numeroRespostas = 0
        questoesRespondidas.forEach((questaoRespondida)=>{
            if(questaoRespondida.acertou) respostasCertas++
            numeroRespostas++
        })

        router.push(`./endGame?respostasCertas=${respostasCertas}&numeroRespostas=${numeroRespostas}`)

    }

    function embaralharArray(array:Resposta[]) { //Embaralha um array de respostas utilizando o algoritmo de Fisher-Yates
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Índice aleatório de 0 a i
        [array[i], array[j]] = [array[j], array[i]]; // Troca os elementos
      }
      return array;
    }

    async function buscaQuestao(): Promise<void> {
        try {
          const resposta:Response = await fetch(geraUrl(questoesRespondidas));
          console.log(resposta)
          const data = await resposta.json()

          if(data === "End game"){ //Se a resposta for End game acaba o jogo

            const todasQuestoes = questoesRespondidas //Todas as questões recebe as questões antigas

            if(questao) todasQuestoes.push(questao) //Adiciona a questão atual a todas as questões
            endGame() // Envia todas as quentões respondidas
            return

          }else{
        
            const respostasConvertidas:Resposta[] = []
  
            data.Respostas.forEach((resposta:any)=>{ //Converte do formato que veio no Data para um Objeto Resposta
              respostasConvertidas.push(new Resposta(resposta.Valor, resposta.Revelada, resposta.Certa))
            })
  
  
            const questaoConvertida: Questao = new Questao(data.Id, data.Pergunta, respostasConvertidas); //Converte do formato recebido em data para o Objeto Questão
            console.log('Questao que Chegou no front end: ', questaoConvertida)

            questaoConvertida.respostas = embaralharArray(questaoConvertida.respostas)

            if(questao) guardaQuestaoAnterior(questao) //Se existe uma questao, guarda ela
            
            setQuestao(questaoConvertida);
          }

        } catch (error) {
          console.error("Erro ao buscar a questão:", error);
        }
      }
      
      function guardaQuestaoAnterior(questaoAnt:any){ // Guarda a questao anterior no array de questoes anteriores
        setQuestoesRespondidas((prev) => [...prev, questaoAnt]); //Pega todos os valores previos e adiciona o novo valor enviado
      } 
    
      function responde(idResposta:number) {
        setQuestao(questao?.responder(idResposta))


        setTimeout(()=>{
            buscaQuestao(); // Handler para o evento, garantindo contexto correto
        }, 1000)
      }
      

    function geraUrl(questoesRespondidasP:Questao[]){

        let novaUrl = urlOriginal;
        questoesRespondidasP.forEach((questaoRespondida) => {
            novaUrl += `/${questaoRespondida.id}`;
        });
        novaUrl += `/${questao?.id}`
        
        return novaUrl; // Retorna a URL atualizada em vez de depender de estado  
    }

    function geraRespostas(questao:Questao){
        const respostas = questao.respostas
        const respostasJsx:any[] = []
        const arrayLetras = ['A', 'B', 'C','D','E','F']

        respostas.forEach((resposta, key)=>{

            respostasJsx.push(
              //Gera os botoes das respostas
            <button key={key} 
            onClick={()=>{ if(!questao.respondida) responde(key) }}  //Se a questão não foi respondida adiciona a ação do click
            className={
                Styles.resposta+ //Adiciona a classe resposta                
                ' '+
                (!questao.respondida? Styles.clicavel:'')+ //Se a questão não foi respondida adiciona a classe clicavel
                ' '+
                (resposta.revelada === true ? resposta.certa?Styles.respostaCerta : Styles.respostaErrada :'')
                } > 
                <div className={Styles.letraBotao+' '+arrayLetras[key]}> {/*Adiciona a classe letraBotao mais a classe com a letra respectiva*/}
                  <p>{arrayLetras[key]}</p>
               </div>
                {resposta.valor} 
            </button>

            )
        
        })

        return respostasJsx
      }
        
    useEffect(() => { //Busca a primeira questão
        buscaQuestao().then(
          ()=>{
            setCarregando(false)
          }
        );

      }, []); 

      /*Logica do Temporizador*/
      useEffect(() => {
        clearTimeout(timeoutRef.current!);
        setTempo(tempoParaResposta);
    
        timeoutRef.current = setInterval(() => {

          setTempo(
            (prev) => {
            if (prev <= 1) {

              if (questao && !questao.respondida) { // Se existe uma questao e ela nao foi respondida ainda
                
                if(questao.respostas[0].certa){ //Garante que se o usuario deixou o tempo passar ele vai errar, se 0 for a resposta certa responde 1 e vice versa
                  responde(1); // Responde automaticamente com valor 1
                }else{
                  responde(0); // Responde automaticamente com valor 0
                }

                clearTimeout(timeoutRef.current!);
                return 0;                
              }
              return 0;                
            }
            return prev - 1;
          });

        }, 1000);
    
        return () => clearTimeout(timeoutRef.current!); // Limpa o temporizador ao desmontar
      }, [questao]);
      /*Logica do Temporizador*/
      if(carregando){
        return(<div className="w-screen h-screen flex justify-center items-center"><img src="/carregando.gif" alt="GIF exemplo" className=" w-14 self-center"/></div> ) //Retorna carregando
      }
    return(
    <main className={Styles.main}>
        <h1 className={Styles.titulo}>Quiz Geral</h1>
        <div className={Styles.temporizador}><p className={Styles.textoTemporizador}>{tempo}</p></div>
        <h2 className={Styles.pergunta}>{questao?.pergunta}</h2>
        {questao? geraRespostas(questao) : ''}
    </main>
    )
}