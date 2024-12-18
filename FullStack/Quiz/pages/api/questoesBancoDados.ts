/* eslint-disable */

import questoesOffline from '@/pages/api/questoesOffline'

import Questao from "../../modelos/Questao";
import Resposta from "../../modelos/Resposta";

import informacoesBd from './informacoesBd'; //Detem as informacoes do banco de dados
import mysql from 'mysql2/promise'; // Importação usando ESModule

//import { ErrorComponent } from 'next/dist/client/components/error-boundary';

const host = informacoesBd().host, user = informacoesBd().user, password = informacoesBd().password, database = informacoesBd().database

// Função para buscar informações do banco
async function retornaInformacoesBanco() {


    try{ //Faz um teste de conexao previo
        const testeconnection = await mysql.createConnection({ //tenta conexao
            host: host,      // Host do banco de dados
            user: user,           // Usuário do MySQL
            password: password,           // Senha do MySQL
            database: database      // Nome do banco de dados
        });
        testeconnection.end()

    }catch(err){
        throw err; // Relança o erro para que o chamador lide com ele
    }

    // Criar a conexão com o banco
    const connection = await mysql.createConnection({
        host: host,      // Host do banco de dados
        user: user,           // Usuário do MySQL
        password: password,           // Senha do MySQL
        database: database   // Nome do banco de dados
    });


    const tabela1 = 'Questoes';
    const tabela2 = 'Respostas';

    const questoesParaResposta:Questao[] = []



    try {
        // Consultas ao banco de dados
        const questoesRespostaBanco:[mysql.RowDataPacket[], mysql.FieldPacket[]] = await connection.execute(`SELECT * FROM ${tabela1}`);
        const questoes = questoesRespostaBanco[0]

        for(const questao of questoes){ //Para cada questão que veio do banco de dados

            const respostasBanco = await connection.execute(`SELECT * FROM ${tabela2} WHERE idQuestao = ${questao.id};`); //Busca para cada questão suas respostas
            const respostas:any = respostasBanco[0] //O mysql retorna uma array, sendo a posição 0 o conteudo e 1 os tipos
            const respostasConvertidas:Resposta[] = [] // Recebera as respostas convertidas para o tipo Resposta

            respostas.forEach((resposta:any) => {
                respostasConvertidas.push( new Resposta(resposta.valor, false, resposta.certa)) //Faz a conversão e guarda em respostas convertidas
            });

            questoesParaResposta.push(
                new Questao(questao.id,questao.pergunta, respostasConvertidas, false)
            )
        }


        // Retorna o array com as questoes
        return questoesParaResposta;

    } catch (err) {

        throw err; // Relança o erro para que o chamador lide com ele
    } finally {

        // Fechar a conexão
        await connection.end();
    }
}

// Função principal que retorna as questões
export default async function QuestoesBancoDados() : Promise<Questao[]> {
    try {
        // Busca informações do banco
        const questoesBanco: Questao[] = await retornaInformacoesBanco(); //Chama a função que se comunica com o banco de dados
        if(questoesBanco.length < 2){ //Se o banco de dados tem menos de 2 questoes
            return questoesOffline()       
        }

        return questoesBanco

    } catch (err) {
        console.error("Erro ao buscar questões do banco:", err);
    }

    // Caso o banco falhe, retorna questões fixas como fallback
    return questoesOffline()
}
