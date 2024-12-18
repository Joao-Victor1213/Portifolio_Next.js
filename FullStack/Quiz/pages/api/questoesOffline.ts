

import Questao from "../../modelos/Questao";
import Resposta from "../../modelos/Resposta";



export default  function QuestoesOffline(){
    const questoes:Questao[] = []
    questoes.push(new Questao(
        1,
        'Qual a capital do Brasil? ',
        [
            new Resposta('Belo Horizonte',false, false),
            new Resposta('Brasilia',false, true),
            new Resposta('São Paulo',false, false),
            new Resposta('Rio de Janeiro',false, false),

        ],
        false,
        false
    ))

    questoes.push(new Questao(
        2,
        'Quantos países existem?',
        [
            new Resposta('347',false, false),
            new Resposta('45',false, false),
            new Resposta('193',false, true),
            new Resposta('1171',false, false),
        ],
        false,
        false
    ))

    questoes.push(new Questao(
        3,
        'Qual a raiz de 64?',
        [
            new Resposta('8',false, true),
            new Resposta('16',false, false),
            new Resposta('4',false, false),
            new Resposta('2',false, false),
        ],
        false,
        false
    ))

    questoes.push(new Questao(
        4,
        'O if na lógica de programação recebe uma condição, no fim uma condição retorna um tipo de valor especifico, qual é o tipo desse valor?',
        [
            new Resposta('number',false, false),
            new Resposta('string',false, false),
            new Resposta('boolean',false, true),
            new Resposta('null',false, false),

        ],
        false,
        false
    ))

    questoes.push(new Questao(
        5,
        'Quantos dedos tem um gato?',
        [
            new Resposta('4',false, false),
            new Resposta('3',false, false),
            new Resposta('12',false, true),
            new Resposta('16',false, false),

        ],
        false,
        false
    ))
    return questoes 

}