'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { postagem, deleteReceita, update } from './receita';
import Menu from './components/navbar';
import ReceitaCard from './components/card';

interface Receita {
  id: number;
  titulo: string;
  tipo: string;
  numero: string;
  nivel: string;
  lista: [string, number, string][]; 
  modoPreparo: string;
}

const ReceitasPage = () => {
  const [receitas, setReceitas] = useState<Receita[]>([]);
  const [titulo, setTitulo] = useState('');
  const [tipo, setTipo] = useState('');
  const [numero, setNumero] = useState('');
  const [nivel, setNivel] = useState('');
  const [modo, setModo] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [lista, setLista] = useState<[string, number, string][]>([['', 0,'']]);
  const [showCadastro, setShowCadastro] = useState(true);
  const [showCard, setShowCard] = useState(false);
  const [selectedReceita, setSelectedReceita] = useState<Receita | null>(null); // Adicionado para armazenar a receita selecionada

  useEffect(() => {
    fetchReceitas();
  }, []);

  const fetchReceitas = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://673bc1f896b8dcd5f3f75c6e.mockapi.io/receita');
      setReceitas(response.data);
    } catch (err) {
      console.error('Erro ao carregar receitas:', err);
      setErrorMessage('Erro ao carregar receitas. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!titulo || !tipo || !nivel || !numero || !lista.length || !modo) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    try {
      setLoading(true);
      if (selectedId) {
        await update(selectedId, titulo, tipo, numero, nivel, lista, modo);
        alert('A receita foi atualizada com sucesso!')
      } else {
        await postagem(titulo, tipo, numero, nivel, lista, modo);
        alert('Nova receita foi postada com sucesso!')
      }
      fetchReceitas();
      clearForm();
    } catch (err) {
      alert(`Erro ao salvar a receita:${err}`);
      setErrorMessage('Falha ao salvar a receita. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (receita: Receita) => {
    setTitulo(receita.titulo);
    setTipo(receita.tipo);
    setNumero(receita.numero);
    setNivel(receita.nivel);
    setLista(receita.lista);
    setSelectedId(receita.id);
    setModo(receita.modoPreparo);
    setShowCadastro(true)
    handleCloseCard()
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleVerReceita = (receita: Receita) => {
    setSelectedReceita(receita);
    setShowCard(true); // Abre o pop-up
  };

  const handleCloseCard = () => {
    setShowCard(false); // Fecha o pop-up
    setSelectedReceita(null);
  };

  const handleAddItem = () => {
    setLista([...lista, ['', 0,'']]);
  };

  const handleChangeItem = (
    index: number,
    field: 'nome' | 'quantidade' | 'tipo',
    value: string | number
  ) => {
    const newLista: [string, number, string][] = lista.map((item, i) => {
      if (i === index) {
        if (field === 'nome') {
          return [value as string, item[1], item[2]]; // Atualiza o nome
        } else if (field === 'quantidade') {
          return [item[0], typeof value === 'number' ? value : parseFloat(value as string), item[2]]; // Atualiza a quantidade
        } else if (field === 'tipo') {
          return [item[0], item[1], value as string]; // Atualiza o tipo
        }
      }
      return item; // Retorna o item original se não for o índice correspondente
    });
    setLista(newLista); // Atualiza o estado com a nova lista
  };
  

  const handleRemoveItem = (index: number) => {
    const newLista = lista.filter((_, i) => i !== index);
    setLista(newLista);
  };

  const clearForm = () => {
    setTitulo('');
    setTipo('');
    setNumero('');
    setNivel('');
    setLista([['', 0,'']]);
    setSelectedId(null);
    setModo('');
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteReceita(id);
      setReceitas((prevReceitas) => prevReceitas.filter((receita) => receita.id !== id));
      handleCloseCard()
    } catch (err) {
      console.error('Erro ao excluir receita:', err);
      setErrorMessage('Erro ao excluir a receita. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-pink-100 p-8 flex-col flex ">
      <Menu showCadastro={showCadastro} setShowCadastro={setShowCadastro} />
  
      {/* Formulário de Cadastro de Receita */}
      {showCadastro ? (
        <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-6 mx-auto">
          <h2 className="text-2xl font-bold text-pink-600 mb-4 flex justify-center gap-2">
            {selectedId ? 'Editar Receita' : 'Cadastrar Receita'}
          </h2>
          {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Coluna 1: Informações principais */}
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Título"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className="w-full border rounded-lg p-2 focus:outline-pink-500"
              />
              <input
                type="text"
                placeholder="Tipo"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                className="w-full border rounded-lg p-2 focus:outline-pink-500"
              />
              <input
                type="number"
                placeholder="Porções"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                className="w-full border rounded-lg p-2 focus:outline-pink-500"
              />
              <input
                type="text"
                placeholder="Nível"
                value={nivel}
                onChange={(e) => setNivel(e.target.value)}
                className="w-full border rounded-lg p-2 focus:outline-pink-500"
              />
              <textarea
                placeholder="Modo de Preparo"
                value={modo}
                onChange={(e) => setModo(e.target.value)}
                className="w-full border rounded-lg p-2  h-56 focus:outline-pink-500"
              />
            </div>
            
            {/* Coluna 2: Ingredientes e Quantidades */}
            <div className="flex flex-col gap-4">
              <div className='max-h-96 overflow-y-auto'>
                {lista.map((item, index) => (
                  <div key={index} className="flex gap-2 mt-2">
                    <input
                      type="text"
                      placeholder="Ingrediente"
                      value={item[0]}
                      onChange={(e) => handleChangeItem(index, 'nome', e.target.value)}
                      className="flex-1 border rounded-lg w-44 p-2 focus:outline-pink-500"
                    />
                    <input
                      type="number"
                      placeholder="Quantidade"
                      value={item[1]}
                      step="0.01"
                      onChange={(e) => handleChangeItem(index, 'quantidade', e.target.value)}
                      className="flex-1 border rounded-lg p-2 w-14 focus:outline-pink-500"
                    />
                    <input
                      type="text"
                      placeholder="Tipo de Quantidade"
                      value={item[2]}
                      onChange={(e) => handleChangeItem(index, 'tipo', e.target.value)}
                      className="flex-1 border rounded-lg w-44 p-2 focus:outline-pink-500"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(index)}
                      className="bg-pink-300 text-white p-2 rounded-lg hover:bg-pink-400"
                    >
                      Remover
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={handleAddItem}
                className="mt-2 w-full bg-pink-400 text-white p-2 rounded-lg hover:bg-pink-500 transition"
              >
                Adicionar Ingrediente
              </button>
            </div>
            
            {/* Botões de Submissão */}
            <div className="col-span-2">
              <button
                type="submit"
                className="w-full bg-pink-600 text-white p-2 rounded-lg hover:bg-pink-800 transition"
              >
                {selectedId ? 'Atualizar Receita' : 'Cadastrar Receita'}
              </button>
            </div>
          </form>
        </div>
      ) : null}
  
      {/* Lista de Receitas */}
      {!showCadastro && (
        <div className="mt-8">
          {loading ? (
            <p>Carregando...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {receitas.map((receita) => (
                <div key={receita.id} className="bg-white rounded-lg shadow-md p-4">
                  <h3 className="text-lg font-semibold text-pink-500">{receita.titulo}</h3>
                  <h4 className='text-gray-700'>⋄ {receita.tipo} ⋄ {receita.numero} porções</h4>
                  <div className='flex align-center justify-center'>
                  <button
                    onClick={() => handleVerReceita(receita)}
                    className="w-full bg-pink-500 text-white p-2 rounded-lg hover:bg-pink-600 transition mt-5"
                  >
                    Ver mais
                  </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
  
      {/* Modal para exibir a receita */}
      {showCard && selectedReceita && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
          <h3 className="text-xl font-semibold text-pink-500 mb-4 flex justify-center"><strong>{selectedReceita.titulo}</strong></h3>
            <ReceitaCard receita={selectedReceita}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        showCard={showCard}
                        setShowCard={setShowCard}
            />
          </div>
        </div>
      )}
    </div>
  );
  
};

export default ReceitasPage;
