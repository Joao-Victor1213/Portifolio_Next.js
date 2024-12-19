'use client' 

import { useRouter } from 'next/router'; // Importa o hook `useRouter` do Next.js, usado para navegação entre rotas.

import { useState } from "react"; // Importa o hook `useState` do React para gerenciar estados locais no componente.

/*Icones*/
import { GoArrowRight } from "react-icons/go"; // Importa o ícone `GoArrowRight` da biblioteca

export default function Home() {
    const router = useRouter(); // Declaração do `useRouter` para permitir redirecionamento e navegação programática.

    const doorsMin = 1, doorsMax = 22; // Define os valores mínimo e máximo permitidos para o número de portas.

    const [numDoors, setNumDoors] = useState(1);


    function decrementNumDoors() {
      if (numDoors - 1 >= doorsMin) {
        setNumDoors(numDoors - 1);
      }
    } // Diminui a quantidade de portas em 1, mas garante que o valor não seja menor que `doorsMin`.

    function incrementNumDoors() {
      if (numDoors + 1 <= doorsMax) {
        setNumDoors(numDoors + 1);
      }
    } // Aumenta a quantidade de portas em 1, respeitando o valor máximo `doorsMax`.


    function redirect() {
      router.push('./portas?numDoors=' + numDoors);
    } // Redireciona o usuário para a página 'portas' passando `numDoors` como parâmetros GET na URL.
            
    return (
      <div className="div_main">
        <div className="div_inter red">
          <p className="p_Titulo">Jogo das </p>
          <p className="p_Titulo">Portas </p>
        </div>
        
        {/* Div para exibir e ajustar a quantidade de portas */}
        <div className="div_inter white">
          <span> Quantidade de portas</span>
          <span className="number"> {numDoors} </span>
          <div className="div_botoes">
            <button onClick={decrementNumDoors}>-</button>
            <button onClick={incrementNumDoors}>+</button>
          </div>
        </div>

        {/* Div Vazia */}
        <div className="div_inter white">

        </div>

        {/* Botão de redirecionamento com um ícone de seta */}
        <button className="div_inter blue" onClick={redirect}>
          <span style={{ fontSize: "250%", alignSelf: "center" }}>
            <GoArrowRight />
          </span>
        </button>
      </div>
    );
}
