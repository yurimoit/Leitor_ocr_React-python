import React, { useState, useEffect } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";

function Login({ setConta }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();
  const navigate2 = useNavigate();


  useEffect(() => {
    if (localStorage.getItem('autorize')) {
      navigate('/home');
    }
  }, [navigate]);



  async function handleSubmit(e) {
    e.preventDefault();

    setEmail('');
    setSenha('')
    navigate2('/home');

  }

  return (
    <div className="login-segment">

      <div className="content-login">
        <div className="text-login">
          <h1>
            Controle seus <span>Exames</span>, sem planilha chata.
          </h1>
          <h2>
            Organizar seus Exames nunca foi tão fácil, com o Dashboad OCR, você
            tem tudo num único lugar e em um clique de distância.
          </h2>
          <button
            onClick={() => {
              navigate("/cadastrar");
            }}
          >
            Cadastrar-se
          </button>
        </div>
        <div className="form-login">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <label >Email</label>
            <br></br>
            <input
              type="text"
              placeholder=""
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br></br>

            <label >Senha</label>
            <br></br>
            <input
              type="password"
              name="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <br></br>
            <button className="login-button" type="submit">Entrar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
