import React, { useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";


function SignUp() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    senhaRepitida: ''
  });
  const navigate = useNavigate();


  async function handleSubmit(e) {
    e.preventDefault();

    setForm({
      nome: '',
      email: '',
      senha: ''
    });

    navigate('/');
  }

  function handleOnChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }


  return (
    <div className="signup-segment">

      <div className="content-signup">
        <form onSubmit={handleSubmit}>
          <h1>Cadastre-se</h1>
          <label>Nome</label>
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleOnChange}

          />
          <br></br>
          <label >Email</label>
          <input
            type="text"
            name="email"
            value={form.email}
            onChange={handleOnChange}

          />
          <br></br>
          <label >Senha</label>
          <input
            type="password"
            name="senha"
            value={form.senha}
            onChange={handleOnChange}

          />
          <br></br>
          <label >Confirmação de Senha</label>
          <input
            type="password"
            name="senhaRepitida"
            value={form.senhaRepitida}
            onChange={handleOnChange}

          />

          <button className="signup-button" type="submit">Cadastrar</button>
          <Link to='/'>Já tem cadastro? Clique aqui!</Link>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
