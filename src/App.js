import { useState } from 'react';

function App() {
  const [tarefas, setTarefas] = useState([]); //Tarefas guarda todas
  const [lista, setLista] = useState([]); //Lista é atualizada
  const [tamanho, setTamanho] = useState(0);

  function handleKeyDown(event) {
    if (event.key !== 'Enter') {
      return;
    }
    const novasTarefas = [...lista, { id: Math.random(), texto: event.target.value, concluido: false }];
    setLista(novasTarefas);
    setTarefas(novasTarefas);
    setTamanho(tamanho + 1);

    event.target.value = '';
  }

  function handleClick(id) {
    const novasTarefas = lista.filter(tarefa => tarefa.id !== id)
    setLista(novasTarefas);
    setTarefas(novasTarefas);
    setTamanho(tamanho - 1);
  }

  function handleConcluir(id) {
    const novasTarefas = [...lista]
    const tarefaConcluida = novasTarefas.find(tarefa => tarefa.id === id)

    tarefaConcluida.concluido = !tarefaConcluida.concluido;
    setLista(novasTarefas)
    setTarefas(novasTarefas)
    console.log(tarefaConcluida)
  }

  function handleTodas() {
    setLista(tarefas)
  }

  function handleAtivas() {
    const novasTarefas = [...tarefas].filter(tarefa => !tarefa.concluido);
    setLista(novasTarefas);
  }
  function handleCompletadas() {
    const novasTarefas = [...tarefas].filter(tarefa => tarefa.concluido);
    setLista(novasTarefas);
  }

  function handleLimpar() {
    const novasTarefas = tarefas.filter(tarefa => !tarefa.concluido);
    setTamanho(novasTarefas.length)
    setTarefas(novasTarefas)
    setLista(novasTarefas);
  }

  return (
    <div className="Container">
      <h1>TAREFAS</h1>
      <input type='text' onKeyDown={handleKeyDown} placeholder='Crie uma nova tarefa' />
      <ul>
        {lista.map(function (tarefa) {

          return (<li key={tarefa.id}>

            <span
              onClick={() => handleConcluir(tarefa.id)}
              style={{ textDecoration: tarefa.concluido ? 'line-through' : '' }}>{tarefa.texto}
            </span>

            <button className='close' onClick={() => handleClick(tarefa.id)}>x</button>
          </li>)
        })}
        <div className='infos'>
          <button>{tamanho} itens restantes</button>
          <div className="divisao">
            <button onClick={handleTodas}>Todas</button>
            <button onClick={handleAtivas}>Ativas</button>
            <button onClick={handleCompletadas}>Completadas</button>
          </div>
          <button onClick={handleLimpar}>Limpar Completadas</button>
        </div>
      </ul>
    </div>
  );
}

export default App;
