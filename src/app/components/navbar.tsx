interface MenuProps {
    showCadastro: boolean;
    setShowCadastro: React.Dispatch<React.SetStateAction<boolean>>;
  }
  
  const Menu: React.FC<MenuProps> = ({ showCadastro, setShowCadastro }) => {
    return (
      <div className="bg-pink-600 text-white p-4 flex justify-between items-center mb-8 rounded-lg sticky top-0">

        <h1 className="text-2xl font-bold">Banco de Receitas M.G.</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setShowCadastro(true)}
            className={`px-4 py-2 rounded-lg ${showCadastro ? 'bg-pink-500' : 'bg-pink-300'} hover:bg-pink-400`}
          >
            Cadastro de Receita
          </button>
          <button
            onClick={() => setShowCadastro(false)}
            className={`px-4 py-2 rounded-lg ${!showCadastro ? 'bg-pink-500' : 'bg-pink-300'} hover:bg-pink-400`}
          >
            Receitas
          </button>
        </div>
      </div>
    );
  };
  
  export default Menu;
  