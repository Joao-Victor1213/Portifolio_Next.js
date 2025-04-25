'use client'
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'


export default function Home() {
  const [carregando, carregandoMod] = useState(false) //guarda o estado se está carregando
  const router = useRouter
  console.log(router)
  const qNumeros = 6 // Quantidade de numeros do jogo
  const numeros:any = []
  
  useEffect(()=>{},[])

  for(var i = 0; i < qNumeros; i++){
    numeros.push(useState(0))  // Cria uma nova variavel de estado para cada numero que será utilizado no jogo e guarda em numeros
  }

  function retornaTagsNumeros(){ //Cria as tags p, uma para cada numero
    var tags = []

    for(var i = 0; i < qNumeros; i++){
  //Adiciona há tags, a classe vai variar se esta carregando ou não, para rodar a animação, coloca na tag o valor das variaveis de estado, que estão na posição 0 de cada linha de numeros
      tags.push(<p key={i} className={carregando ? styles.resultadoAnimado: styles.resultado} >{numeros[i][0]}</p>) 
    }

    return tags
  }

  function geraNumerosAleatorios(){
    carregandoMod(true) // Seta a variavel carregando como verdadeiro, para rodar as animações
    setTimeout(() => { //Pausa por 3 segundos e depois gera os numeros aleatorios, e por fim para de carregar
      for(var i = 0; i < qNumeros; i++){
        var f = numeros[i][1]
        f((Math.floor( Math.random() * 10)))
      }

      carregandoMod(false) // Seta a variavel carregando como falso, para parar as animações

    }, 3000)

  }
  //const  arrayEstados = [useState(0), useState(0), useState(0), useState(0),useState(0),useState(0)]
  //const numeros = [arrayEstados[0], arrayEstados[1], arrayEstados[2], arrayEstados[3],arrayEstados[4], arrayEstados[5]]



  return (
    <main className={styles.main}>
      <h1 className={styles.h1}> Numeros da Sorte</h1>
      <div className={styles.description}>
      {
        retornaTagsNumeros() //Crias as tags p para cada numero
      }

      <button onClick={geraNumerosAleatorios}className= {styles.button}> 

      {carregando? 'Carregando':'Carregar' /*Valor que estará escrito no botão */}  

      <div style={{
        display: 'flex',
        gap: '2px',
        margin:'3px'
      }}>
          <div className={carregando ? styles.animacao : '' /*Se estiver carregando seta a animação */}></div>
          <div className={carregando ? styles.animacao : '' /*Se estiver carregando seta a animação */}></div>
          <div className={carregando ? styles.animacao : '' /*Se estiver carregando seta a animação */}></div>
      </div>

      </button>
      </div>

    </main>
  );
}
