import mysql from 'mysql2/promise'; // Importação usando ESModule
import type { NextApiRequest, NextApiResponse } from 'next';
import informacoesBd from '../informacoesBd'; // Detém as informações do banco de dados

export default async function AdiconaValoresBanco(req: NextApiRequest, res: NextApiResponse) {
    const { host, user, password, database } = informacoesBd();

    let connection: mysql.Connection;
    try {
        connection = await mysql.createConnection({
            host,      // Host do banco de dados
            user,      // Usuário do MySQL
            password,  // Senha do MySQL
            database,  // Nome do banco de dados
        });
    } catch (err) {
        console.error('Erro no banco de dados:', err);
        res.status(500).send('Erro no banco de dados: ' + err);
        return;
    }

    try {
        const [resposta1]: [mysql.OkPacket, mysql.FieldPacket[]] = await connection.execute(`
            INSERT INTO Questoes(pergunta) VALUES('${req.query.valorQuestao}');
        `);

        const respostaCerta: number = Number(req.query.respostaCerta);

        await connection.execute(`
            INSERT INTO Respostas(valor, certa, idQuestao) VALUES
            ('${req.query.resposta1Valor}', ${respostaCerta === 1 ? 'true' : 'false'}, ${resposta1.insertId}),
            ('${req.query.resposta2Valor}', ${respostaCerta === 2 ? 'true' : 'false'}, ${resposta1.insertId}),
            ('${req.query.resposta3Valor}', ${respostaCerta === 3 ? 'true' : 'false'}, ${resposta1.insertId}),
            ('${req.query.resposta4Valor}', ${respostaCerta === 4 ? 'true' : 'false'}, ${resposta1.insertId});
        `);

        res.status(200).json('Adicionado com sucesso!');
    } catch (err) {
        console.error('Erro ao adicionar valores ao banco:', err);
        res.status(500).send('Erro ao adicionar valores ao banco: ' + err);
        return;
    }
}
