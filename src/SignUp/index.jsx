import React, { useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import api from '../services/api';
import toast from 'react-hot-toast';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';


function SignUp() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    senhaRepitida: ''
  });
  const navigate = useNavigate();
  const [isDoutor, setIsDoutor] = useState(true)
  const [statusVisibilidadeR, setStatusVisibilidadeR] = useState(false);
  const [statusVisibilidadeL, setStatusVisibilidadeL] = useState(false);
  const [messagemErrorNome, setMessagemErrorNome] = useState('');
  const [messagemErrorEmail, setMessagemErrorEmail] = useState('');
  const [messagemErrorSenha, setMessagemErrorSenha] = useState('');


  async function handleSubmit(e) {
    e.preventDefault();

    if (!((form.nome.trim().split(' ').length === 2) && (/^[a-zA-Z" "]+$/.test(form.nome)))) {
      return setMessagemErrorNome("O campo nome e sobrenome esta incorreto")
    }

    setMessagemErrorNome('')

    if (!(form.email.includes('@') && (form.email.includes('.')) && (form.email.trim().split(' ').length === 1))) {
      return setMessagemErrorEmail("O campo email esta incorreto")
    }

    setMessagemErrorEmail('')

    if (!((form.senha) && (form.senhaRepitida))) {
      return setMessagemErrorSenha("O campo das senhas esta vazio")
    }
    if (!(form.senha === form.senhaRepitida)) {
      return setMessagemErrorSenha("As senhas precisam ser iguais")
    }
    if (!(form.senha.length >= 8 && form.senhaRepitida.length >= 8)) {
      return setMessagemErrorSenha("As senhas precisam ter no minimo 8 caracteres")
    }

    setMessagemErrorSenha('')

    try {
      const response = await api.post('/cadastrarUsuario', {
        nome: form.nome,
        email: form.email,
        senha: form.senha,
        is_doutor: isDoutor
      })

      if (response.data) {
        // console.log(response.data)
      }

      setForm({
        nome: '',
        email: '',
        senha: '',
        senhaRepitida: ''
      });


      toast.success(`Cadastro efetuadio com sucesso!`)
      navigate('/');

    } catch (error) {
      toast.error("Erro ao fazer o cadastro, tente novamente")
      // console.log(error);
      return
    }
  }

  function handleOnChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }


  return (
    <div className="signup-segment">

      <div className="content-signup">
        <h1>Faça seu cadastro</h1>
        <form onSubmit={handleSubmit}>
          <div class="input-container">
            <input
              placeholder="Nome e sobrenome"
              className="input-field"
              type="text"
              name="nome"
              value={form.nome}
              onChange={(e) => handleOnChange(e)}
            />
            <label for="input-field" className="input-label">Nome e sobrenome</label>
            <span className="input-highlight"></span>
          </div>
          {messagemErrorNome && (<span className='mensagem-error-cadastrar'>{messagemErrorNome}</span>)}
          <div className="input-container">
            <input
              placeholder="E-mail"
              className="input-field"
              type="text"
              name="email"
              value={form.email}
              onChange={(e) => handleOnChange(e)}
            />
            <label for="input-field" className="input-label">E-mail</label>
            <span className="input-highlight"></span>
          </div>
          {messagemErrorEmail && (<span className='mensagem-error-cadastrar'>{messagemErrorEmail}</span>)}
          <div className="input-container">
            <input
              placeholder="Senha"
              className="input-field"
              type={!statusVisibilidadeR ? 'password' : 'text'}
              name="senha"
              value={form.senha}
              onChange={(e) => handleOnChange(e)}
            />
            <button className='btn-v' onClick={() => setStatusVisibilidadeR(!statusVisibilidadeR)} type='button'>
              {!statusVisibilidadeR ? <VisibilityOffOutlinedIcon sx={{ width: '20px', height: '20px', color: '#747488' }} /> : <RemoveRedEyeOutlinedIcon sx={{ width: '20px', height: '20px', color: '#747488' }} />}
            </button>
            <label for="input-field" className="input-label">Senha</label>
            <span className="input-highlight"></span>
          </div>
          {messagemErrorSenha && (<span className='mensagem-error-cadastrar'>{messagemErrorSenha}</span>)}
          <div className="input-container">
            <input
              placeholder="Digite novamente a senha"
              className="input-field"
              type={!statusVisibilidadeL ? 'password' : 'text'}
              name="senhaRepitida"
              value={form.senhaRepitida}
              onChange={(e) => handleOnChange(e)}
            />
            <button className='btn-v' onClick={() => setStatusVisibilidadeL(!statusVisibilidadeL)} type='button'>
              {!statusVisibilidadeL ? <VisibilityOffOutlinedIcon sx={{ width: '20px', height: '20px', color: '#747488' }} /> : <RemoveRedEyeOutlinedIcon sx={{ width: '20px', height: '20px', color: '#747488' }} />}
            </button>
            <label for="input-field" className="input-label">Digite novamente a senha</label>
            <span className="input-highlight"></span>
          </div>

          {messagemErrorSenha && (<span className='mensagem-error-cadastrar'>{messagemErrorSenha}</span>)}

          <div class="container">
            <label className="container-radio-label">
              <input style={{ backgroundColor: `${isDoutor ? '#414181' : '#fff'}`, color: `${isDoutor ? '#fff' : '#414181'}` }} className="container-radio-label-input"
                type="radio"
                name="radio"
                onChange={() => setIsDoutor(true)}
              />
              <span style={{ backgroundColor: `${isDoutor ? '#414181' : '#fff'}`, color: `${isDoutor ? '#fff' : '#414181'}` }} className="container-radio-label-span">Doutor</span>
            </label>
            <label className="container-radio-label">
              <input style={{ backgroundColor: `${!isDoutor ? '#414181' : '#fff'}`, color: `${!isDoutor ? '#fff' : '#414181'}` }} className="container-radio-label-input"
                type="radio"
                name="radio"
                onChange={() => setIsDoutor(false)}
              />
              <span style={{ backgroundColor: `${!isDoutor ? '#414181' : '#fff'}`, color: `${!isDoutor ? '#fff' : '#414181'}` }} className="container-radio-label-span">Paciente</span>
            </label>
          </div>
          <button className="signup-button" type="submit">Cadastrar</button>
          <Link to='/'>Já tem cadastro? Clique aqui!</Link>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
