import './App.css';
import { useState } from 'react';
import './App.css';
import api from '../services/api';

function App() {
  const [status, setStatus] = useState(false);
  const [lista, setLista] = useState({});
  const [form, setForm] = useState({
    email: "",
    senha: ""
  });

  function handleChangeForm(e) {
    e.preventDefault();

    if (!form.email || !form.senha) {
      setStatus(true);
      return;
    }

    setForm({
      email: '',
      senha: ''
    })

    get_listaUsuarios();
  }

  function handleSetForm(e) {
    setForm({
      ...form, [e.target.name]: e.target.value
    })
  }

  async function get_listaUsuarios() {
    try {
      const response = await api.get('/');

      console.log(response);

      setLista({ ...response.dados })
    } catch (error) {
      console.log(error.message);
    }
  }

  console.log(lista);

  return (
    <div className="App">
      <form onSubmit={handleChangeForm}>
        <label>Digite seu nome</label>
        <input
          name='email'
          placeholder='Joao@gmail.com'
          type='text'
          value={form.email}
          onChange={(e) => handleSetForm(e)}
        />
        <label>Digite sua senha</label>
        <input
          name='senha'
          placeholder='senha123'
          type='password'
          value={form.senha}
          onChange={(e) => handleSetForm(e)}
        />

        <button type='submit'>Enviar</button>
      </form>
      <div>
        {status ? <span>Todos os campos são validos</span> : null}
        <h4>Nome valor input:{form.email + " " + form.senha}</h4>
        <h4>Nome do banco de dados:</h4>
      </div>
    </div>
  );
}

export default App;
