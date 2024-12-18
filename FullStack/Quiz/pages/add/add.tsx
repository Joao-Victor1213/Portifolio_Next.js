
import { useState } from "react";
import Styles from '@/pages/add/add.module.css';

export default function Add(){
    const [mensagem, setMensagem] = useState<string>()

    const [questao, setQuestao] = useState<string>('')

    const [resposta1, setResposta1] = useState('')
    const [resposta2, setResposta2] = useState('')
    const [resposta3, setResposta3] = useState('')
    const [resposta4, setResposta4] = useState('')

    const [respostaCerta, setRespostaCerta] = useState<number>(1)

    function controlaRespostaCerta(valor:number){
        if(valor >=1 && valor <= 4){
            setRespostaCerta(valor)
        }
    }

    function limpaInformacoes(){
        setQuestao('')
        setResposta1('')
        setResposta2('')
        setResposta3('')
        setResposta4('')
        setRespostaCerta(1)
    }

    async function enviarInformacoes(){
        if(questao.length >= 10){
            if( resposta1 != '' && resposta2 != '' && resposta3 != '' && resposta4 != ''){
                const resposta = await fetch(`../api/adicionaQuestaoBanco/valores?valorQuestao=${questao}&resposta1Valor=${resposta1}&resposta2Valor=${resposta2}&resposta3Valor=${resposta3}&resposta4Valor=${resposta4}&respostaCerta=${respostaCerta}`)
                if(resposta.status == 200){
                    setMensagem('Enviado com sucesso')
                    limpaInformacoes()
                }else{
                    setMensagem('Não foi possivel enviar, tente novamente.' + resposta.body)
                } 
            
            }else{
                setMensagem('Escreva todas as respostas')
            }
        }else{
            setMensagem('Escreva mais em questão')
        }

    }
    return (
        <main className={Styles.main}>
            <p>{mensagem}</p>
            <textarea className={Styles.entradaTexto}  spellCheck="true" placeholder="Questao" value={questao} onChange={(e:React.ChangeEvent<HTMLTextAreaElement>)=>{setQuestao(e.target.value)}}></textarea>
            
            <div>1</div><input className={Styles.entradaTexto} type='text' spellCheck="true" placeholder="Resposta 1" value={resposta1} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setResposta1(e.target.value)}}></input>
            <div>2</div><input className={Styles.entradaTexto} type='text' spellCheck="true" placeholder="Resposta 2" value={resposta2} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setResposta2(e.target.value)}}></input>
            <div>3</div><input className={Styles.entradaTexto} type='text' spellCheck="true" placeholder="Resposta 3" value={resposta3} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setResposta3(e.target.value)}}></input>
            <div>4</div><input className={Styles.entradaTexto} type='text' spellCheck="true" placeholder="Resposta 4" value={resposta4} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setResposta4(e.target.value)}}></input>
            
            <p>Qual a resposta certa?</p><input className={Styles.entradaNumber} type="number" placeholder="Resposta certa" value={respostaCerta} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{controlaRespostaCerta(+e.target.value)}}></input>

            <button className={Styles.botao} onClick={enviarInformacoes}>Adicionar</button>
        </main>
    );
}