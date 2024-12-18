import { useState } from 'react';
import styles from './porta.module.css';
import Presente from './presente'; // Importa o componente Presente, que será exibido quando a porta for aberta e houver um presente.

export default function Porta(props:any) {
  // Definindo as cores
  const corSelecionada: string = 'yellow';
  const corNaoSelecionada: string = 'brown';

  const [portaAberta, setPortaAberta] = useState(false); // Estado para controlar se a porta está aberta ou não.

  // Função para abrir a porta. Ela impede a propagação do evento e verifica se a abertura não está bloqueada.
  function abrePorta(event:any){

    event.stopPropagation(); // Impede que o clique afete outros elementos fora da porta.

    if(!props.bloqueiaAbertura){ // Verifica se a abertura da porta está bloqueada.
      setPortaAberta(true); 
      props.incrementaNumPortasAbertas(props.numero); // Chama a função passada via props para informar que uma porta foi aberta.
    }

  }

  const conteudo = []; // Array que contém o conteúdo da porta

  if(portaAberta){     // Se a porta estiver aberta, exibe o componente Presente se props.comPresente for true, caso contrário, exibe um div vazio.

    conteudo.push(props.comPresente ? <Presente></Presente> : <div></div>);

  } else {     // Se a porta estiver fechada, exibe a porta e a maçaneta.

    conteudo.push(
        <div className={styles.portaParte1}>
            <span className={styles.numero}> {props.numero}</span> {/* Número da porta. */}
        </div>,
        <div className={styles.portaParte2}>
            <div className={styles.macaneta} onClick={abrePorta}></div>
        </div>
    );
  }

  if(props.fechar){   // Verifica se a porta deve ser fechada (usado em reinicializações). Um temporizador é usado para evitar chamadas simultâneas que possam causar erros.

    setTimeout(() => {
      setPortaAberta(false); // Fecha a porta após um tempo definido por props.tempoParaFechar.
    }, props.tempoParaFechar);

  }

  return (
    <div className={styles.conteudo}>
      {/* Define o estilo da porta com base no estado (aberta ou fechada) e permite a seleção da porta com uma função de callback. */}
      <div className={portaAberta ? styles.portaAberta : styles.porta} 
        onClick={() => props.funcaoSelecionada(props.numero)} // Comunicação indireta com o componente pai quando a porta é clicada.

        style={{ 
            borderColor: props.selecionada ? corSelecionada : corNaoSelecionada, // Altera a cor da borda dependendo se a porta está selecionada.
            backgroundColor: portaAberta ? 'black' : '#7b4b1b', // Altera a cor de fundo dependendo do estado da porta.
        }}>
        
        {conteudo} {/* Renderiza o conteúdo da porta. */}
      </div>
      <div className={styles.rodape}></div> {/* Rodapé da porta */}
    </div>
  );
}
