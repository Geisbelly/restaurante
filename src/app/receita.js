// utils/api.js
export const postagem = async (titulo, tipo, numero, nivel, lista,modo) => {
    const newReceita = {
      "id": 0,
      "titulo": titulo,
      "tipo": tipo,
      "numero": numero,
      "nivel": nivel,
      "lista": lista,
      "modoPreparo":modo,
    };
  
    try {
      const response = await fetch('https://673bc1f896b8dcd5f3f75c6e.mockapi.io/receita', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newReceita)
      });
  
      if (!response.ok) {
        // Handle HTTP errors
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const task = await response.json();
      // Do something with the new task
      console.info(task);
    } catch (error) {
      // Handle network or other errors
      console.error('An error occurred:', error);
    }
  };
  

  // utils/api.js
  export const deleteReceita = async (id) => {
    const url = `https://673bc1f896b8dcd5f3f75c6e.mockapi.io/receita/${id}`
    fetch(url, {
        method: 'DELETE',
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        // handle error
    }).then(task => {
        console.info(task);
    }).catch(error => {
        console.error('An error occurred:', error);
    })
    
  };


  export const update = async (id,titulo, tipo, numero, nivel, lista,modo) => {
    const newReceita = {
      "id": id,
      "titulo": titulo,
      "tipo": tipo,
      "numero": numero,
      "nivel": nivel,
      "lista": lista,
      "modoPreparo":modo,
    };
  
    try {
      const response = await fetch(`https://673bc1f896b8dcd5f3f75c6e.mockapi.io/receita/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newReceita)
      });
  
      if (!response.ok) {
        // Handle HTTP errors
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const task = await response.json();
      // Do something with the new task
      console.info(task);
    } catch (error) {
      // Handle network or other errors
      console.error('An error occurred:', error);
    }
  };