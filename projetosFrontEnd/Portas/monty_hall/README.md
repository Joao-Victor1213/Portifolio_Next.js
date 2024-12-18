# Monty Hall Game

Este é um jogo baseado no famoso **Teorema de Monty Hall**, que explora a probabilidade e decisões em jogos de escolha. O projeto simula o cenário clássico em que o jogador tenta escolher a porta que esconde um prêmio, levando em consideração as opções de troca de portas durante o jogo.

## Descrição do Projeto

O **Monty Hall** é um jogo simples em que o jogador deve escolher uma das três portas. Atrás de uma delas há um prêmio e atrás das outras, nada. Depois de uma escolha inicial, o apresentador (um modelo do jogo) revela uma porta sem prêmio e oferece ao jogador a chance de trocar a escolha original. A estratégia de troca aumenta a probabilidade de ganhar o prêmio.

## Funcionalidades

1. **Página Inicial**: 
   - 4 divisórias: uma com o nome "Monty Hall", a segunda com botões para incrementar ou decrementar a quantidade de portas, e a terceira com botões para escolher a porta selecionada.
   
2. **Jogo**:
   - Escolha uma porta inicial.
   - Abra as portas para tentar encontrar o prêmio.
   - Você pode trocar a porta escolhida a qualquer momento.

3. **Botões de Controle**:
   - Recarregar a página.
   - Voltar à página inicial para reiniciar o jogo.

## Como Jogar

1. Defina a quantidade de portas usando os botões de mais (+) e menos (-).
2. Escolha a porta inicial.
3. Durante o jogo, selecione portas e tente encontrar o prêmio.
4. Você pode trocar sua escolha a qualquer momento.
5. Use os botões de controle para recarregar ou voltar ao início.

## Teorema de Monty Hall

O Teorema de Monty Hall é um problema de probabilidade que se baseia no seguinte:

- Existem três portas. Atrás de uma delas há um prêmio e atrás das outras, nada.
- O jogador escolhe uma porta.
- O apresentador, que sabe onde está o prêmio, abre uma das portas restantes, sempre revelando uma porta sem prêmio.
- O jogador tem a opção de manter sua escolha inicial ou trocar para a outra porta restante.
- A probabilidade de ganhar ao trocar de porta é de 2/3, enquanto a probabilidade de ganhar ao manter a escolha é de 1/3.

## Link de Visualização

Você pode visualizar o projeto hospedado na Vercel [aqui](https://montyhall-three.vercel.app/).
