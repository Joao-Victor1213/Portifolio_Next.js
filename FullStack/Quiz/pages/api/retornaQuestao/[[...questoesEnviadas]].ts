
import type { NextApiRequest, NextApiResponse } from 'next';

import Questao from "../../../modelos/Questao";
import questoesBancoDados from "@/pages/api/questoesBancoDados";

const maximoQuestoes = 10 // Guarda o maximo de questoes que podem ser renderizadas

function arrayStringToNumber(arrayString:string|string[]) : number[]{ //Transforma cada valor de string para o array number
  const arrayNumber:number[] = []

  if(Array.isArray(arrayString)) //Se for um array de strings
  arrayString.forEach((valor)=>{
    arrayNumber.push(+valor)
  })

  return arrayNumber

}

export default async function RetornaQuestao(req:NextApiRequest ,res:NextApiResponse) {
  const questoesResposta:Questao[] =  await questoesBancoDados()
  const questoesArray:Questao[] = questoesResposta

  console.log('Questoes Array', questoesArray)
  const numQuestoes =  questoesArray.length

  if(req.query.questoesEnviadas){ // Se foi enviado algum parametro {questoesEnviadas}

    const questoesJaEnviadasString:string|string[] = req.query.questoesEnviadas
    let questoesJaEnviadas:number[] = []

    questoesJaEnviadas = arrayStringToNumber(questoesJaEnviadasString) //Converte os valores string para number
  
     let numeroAleatorio:number = questoesJaEnviadas[0] //Inicia o numeroAleatorio com o primeiro valor recebido na url, para que a lógica do while para filtrar funcione corretamente
    

     /*Se já não foram enviadas todas as questoes ou chegou o maximo de questoes que pode enviar, manda finalizar o jogo*/
    if(questoesJaEnviadas.length >= numQuestoes || questoesJaEnviadas.length >= maximoQuestoes){ 
      
      res.status(200).json('End game');
    
    }else{
      while(questoesJaEnviadas.includes(numeroAleatorio)){ //Se questoes ja enviadas (que detem os valores recebidos na url) já tem esse numero gerado, gera um novo
        numeroAleatorio = Math.floor(Math.random() * (numQuestoes)+1 )
      }

      questoesArray.forEach(questao => { //para cada questao
        if(questao.id == numeroAleatorio ) res.status(200).json(questao);  //Se a questão tiver o id igual ao valor aleatorio gerada retorna ela
      });
    }


  }else{ // Se não foi enviado nenhum parametro {questoesEnviadas}

    const numeroAleatorio = Math.floor(Math.random() * (numQuestoes) )
    res.status(200).json(questoesArray[numeroAleatorio]);
  
  }
  



}
