'use client' 

import { useRouter } from 'next/router'; // Importa o hook `useRouter` do Next.js, usado para navegação entre rotas.

import { useState } from "react"; // Importa o hook `useState` do React para gerenciar estados locais no componente.

/*Icones*/
import { GoArrowRight } from "react-icons/go"; // Importa o ícone `GoArrowRight` da biblioteca

export default function Home() {
    const router = useRouter(); // Declaração do `useRouter` para permitir redirecionamento e navegação programática.

    const doorsMin = 1, doorsMax = 22; // Define os valores mínimo e máximo permitidos para o número de portas.

    const [numDoors, setNumDoors] = useState(1);
    const [door, setDoor] = useState(1); // Define dois estados, `numDoors` para a quantidade de portas e `door` para a porta selecionada inicialmente.

    function check_numbers() {
      if (door > numDoors) {
        setDoor(numDoors);
      }
    } // Verifica se a porta selecionada excede o número de portas disponíveis e ajusta a seleção se necessário.

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

    function decrementDoor() {
      if (door - 1 >= doorsMin) {
        setDoor(door - 1);
      }
    } // Diminui a porta selecionada em 1, sem ultrapassar o valor mínimo `doorsMin`.

    function incrementDoor() {
      if (door + 1 <= numDoors) {
        setDoor(door + 1);
      }
    } // Aumenta a porta selecionada em 1, garantindo que não seja maior que `numDoors`.

    function redirect() {
      router.push('./portas?numDoors=' + numDoors + '&door=' + door);
    } // Redireciona o usuário para a página 'portas' passando `numDoors` e `door` como parâmetros GET na URL.

    check_numbers(); // Chama a função `check_numbers` para garantir que a porta selecionada esteja dentro dos limites permitidos.

    return (
      <div className="div_main">
        <div className="div_inter red">
          <p className="p_Titulo">Mont </p>
          <p className="p_Titulo">Hall </p>
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

        {/* Div para exibir e ajustar a porta selecionada */}
        <div className="div_inter white">
          <span> Porta escolhida</span>
          <span className="number"> {door} </span>
          <div className="div_botoes">
            <button onClick={decrementDoor}>-</button>
            <button onClick={incrementDoor}>+</button>
          </div>
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
