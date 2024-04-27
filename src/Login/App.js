import React, { useState, useEffect } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import api from '../services/api';
import toast from "react-hot-toast";
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

function Login({ setVerificacao }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();
  const navigate2 = useNavigate();
  const [messagemError, setMessagemError] = useState('');
  const [statusVisibilidadeR, setStatusVisibilidadeR] = useState(false);


  useEffect(() => {
    if (localStorage.getItem('autorize')) {
      navigate('/home');
    }
  }, [navigate]);



  async function handleSubmit(e) {
    e.preventDefault();

    if (!senha || !email) {
      return setMessagemError('Preencha os campos acima!!');
    }
    if (!email.includes('@') || !email.includes('.com')) {
      return setMessagemError('Preencha o campo de e-mail corretamente!');
    }

    try {
      const response = await api.post('/login/usuario', {
        email, senha
      })

      if (response && response.data) {
        // console.log(response.data)
        localStorage.setItem('E%H6%2&6GB8UU!UZ3XncHd', response.data.token)


        if (response.data.usuario && response.data.usuario['verificacao'] === true) {
          setEmail('')
          setSenha('')
          navigate2('/home')
          localStorage.setItem('BcD#p%swmmE6e%dR9UJK^kqBi@JMtf27', response.data.tokenn)
          return
        }

        setEmail('')
        setSenha('')
        navigate2('/home/usuario')
        if (Boolean(localStorage.getItem('BcD#p%swmmE6e%dR9UJK^kqBi@JMtf27'))) {
          localStorage.removeItem('BcD#p%swmmE6e%dR9UJK^kqBi@JMtf27')
        }

      }


      toast.success("Acesso permitido com sucesso!");
    } catch (error) {
      // console.log(error)
      if (error && error.response.data.mensagem) {
        toast.error(error.response.data.mensagem)
      } else {
        toast.error("Erro ao fazer login.")
      }
    }


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
            <div className="input-container-login">
              <input
                placeholder="E-mail"
                className="input-field-login"
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label for="input-field" className="input-label">E-mail</label>
              <span className="input-highlight"></span>
            </div>

            <div className="input-container-login">
              <input
                placeholder="Senha"
                className="input-field-login"
                type={!statusVisibilidadeR ? 'password' : 'text'}
                name="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              <button className='btn-v' onClick={() => setStatusVisibilidadeR(!statusVisibilidadeR)} type='button'>
                {!statusVisibilidadeR ? <VisibilityOffOutlinedIcon sx={{ width: '20px', height: '20px', color: '#747488' }} /> : <RemoveRedEyeOutlinedIcon sx={{ width: '20px', height: '20px', color: '#747488' }} />}
              </button>
              <label for="input-field" className="input-label">Senha</label>
              <span className="input-highlight"></span>
            </div>
            <span className='mensagem-error'>{messagemError}</span>
            <button className="login-button" type="submit">Entrar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
