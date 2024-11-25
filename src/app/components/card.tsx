import React from 'react';

interface Receita {
  id: number;
  titulo: string;
  tipo: string;
  numero: string;
  nivel: string;
  lista: [string, number,string][]; 
  modoPreparo: string;
}

interface ReceitaCardProps {
  receita: Receita;
  onEdit: (receita: Receita) => void;
  onDelete: (id: number) => void;
  showCard: boolean;
  setShowCard: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReceitaCard: React.FC<ReceitaCardProps> = ({ receita, onEdit, onDelete, setShowCard }) => {
  const handleCloseCard = () => {
    setShowCard(false);
  };

  

  return (
    <div className="bg-white rounded shadow-lg p-4 border max-h-screen overflow-y-auto">
      
      <h4 className='text-pink-400'><strong>Descrição</strong></h4>
      <p className='text-gray-600'><strong className='text-gray-800'>Tipo:</strong> {receita.tipo} | <strong className='text-gray-800'>Nível:</strong> {receita.nivel} | <strong className='text-gray-800'>Porções:</strong> {receita.numero}</p>
      <br />
      <hr />
      <br />
      <p className='text-pink-400'><strong>Ingredientes</strong></p>
      <ul className='text-gray-700'>
        {receita.lista.map((item, index) => (
          item[0].trim() !== '' && ( // Verifica se o nome do ingrediente não é vazio
            <li key={index}>
              {item[1]} - {item[2]} de {item[0]} 
            </li>
          )
        ))}
      </ul>
      <br />
        <hr />
    <br />
      <p className='text-pink-400'><strong>Modo de Preparo</strong> </p>
      <p className='text-gray-700'> {receita.modoPreparo}</p>
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onEdit(receita)}
          className="w-full bg-pink-500 text-white p-2 rounded-lg hover:bg-pink-700 transition"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(receita.id)}
          className="w-full bg-purple-400 text-white p-2 rounded-lg hover:bg-purple-500 transition"
        >
          Excluir
        </button>
        <button
          onClick={handleCloseCard}
          className="w-full bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-700 transition"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default ReceitaCard;
