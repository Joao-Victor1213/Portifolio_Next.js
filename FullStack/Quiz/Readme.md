# **Quiz 10**  
O **Quiz 10** é uma aplicação de perguntas e respostas,  que desafia usuários a responderem cada questão em até 10 segundos. Desenvolvida com um design em tons de roxo, a aplicação entrega um questionário de até 10 perguntas e apresenta os resultados ao final, incluindo o número de perguntas, acertos e a porcentagem de desempenho.

---

## **Link de Visualização**  
Você pode visualizar o projeto hospedado na Vercel [aqui](https://quiz-mocha-seven.vercel.app/).
 
---
## Habilidades demonstradas no projeto

   - Criação de Components React
   - Responsividade
   - Utilização de Banco de dados Mysql com Next
   - Criação de APIS
   - Requisições
   - Utilização dos Hooks (useEffect, useRouter, useState)
   - Tratamento de erros com Exceção
   - Manipulação de strings
   - Manipulação de rotas
   - Utilização de Typescript
   - Utiilização de eventos
   - Utiilização de intervalos
   - Utilização de Classes e Interfaces
   - Comunicação direta e indireta

## **Descrição do Projeto**  
O **Quiz 10** busca perguntas diretamente de um banco de dados MySQL, garantindo flexibilidade e escalabilidade no gerenciamento das questões. Ele é estruturado de forma a oferecer um questionário dinâmico e desafiador, com perguntas que devem ser respondidas rapidamente. Caso o banco de dados não esteja acessível, a aplicação retorna perguntas padrão para manter a experiência do usuário.

---

## **Funcionalidades**

### **Para Usuários:**
- **Participar do Quiz**:
  - Responda até 10 perguntas, cada uma com um limite de 10 segundos.
  - Receba ao final o número total de perguntas, o número de acertos e a porcentagem de desempenho.
- **Modo Offline**:
  - Caso não haja acesso ao banco de dados, a aplicação exibe um conjunto de perguntas padrão.

### **Para Administradores:**
- **Adicionar Questões**:
  - Acesse a rota `/add/add` para inserir novas perguntas e respostas diretamente no banco de dados.

---

## **Estrutura do Banco de Dados**

- **Tabela `Questoes`**:
  - Contém as perguntas disponíveis no quiz.
  - Cada questão tem um ID único.

- **Tabela `Respostas`**:
  - Contém as respostas associadas a cada pergunta.
  - Cada resposta possui uma foreign key para a tabela `Questoes`, garantindo que as opções estejam vinculadas corretamente.

---

## **Como Usar**

1. **Para Jogadores**:
   - Entre na aplicação e clique no botão "Começar".
   - Responda cada pergunta dentro do limite de 10 segundos.
   - Visualize os resultados ao final do quiz, incluindo o número total de perguntas, acertos e sua porcentagem de desempenho.

2. **Para Administradores**:
   - Navegue até `/add/add` para adicionar novas questões e suas respectivas respostas ao banco de dados.

---

## **Design e Tema**  
- O tema em tons de roxo cria um ambiente moderno e dinâmico, ideal para a proposta do quiz.  
- A interface é simples e responsiva, proporcionando uma experiência agradável em qualquer dispositivo.

---

## **Tecnologias Utilizadas**  
- **Framework**: Next.js  
- **Banco de Dados**: MySQL
- **Linguagens**: Typescript e Javascript  
- **Hospedagem**: Vercel  


---

## **Funcionamento offline**  
A aplicação está preparada para funcionar mesmo sem acesso ao banco de dados, utilizando um conjunto de perguntas padrão para garantir que a experiência do usuário não seja interrompida.

---

## **Conclusão**  
O **Quiz 10** é uma aplicação divertida e desafiadora, que combina tecnologia e simplicidade para entregar uma experiência única aos usuários. Além disso, sua estrutura robusta baseada em MySQL permite fácil expansão e gerenciamento de novas perguntas.
