import { useState, React, useEffect } from "react";
import Modal from "react-modal";
import CloseIcon from '@mui/icons-material/Close';
import "./style.css";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import api from "../../services/api";
import { toast } from "react-hot-toast";
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { IMaskInput } from "react-imask";


function EditProfile({ modalIsOpen, setIsOpen }) {

  const [statusVisibilidadeR, setStatusVisibilidadeR] = useState(false);
  const [statusVisibilidadeL, setStatusVisibilidadeL] = useState(false);
  const [messagemErrorNome, setMessagemErrorNome] = useState('');
  const [messagemErrorEmail, setMessagemErrorEmail] = useState('');
  const [messagemErrorSenha, setMessagemErrorSenha] = useState('');
  const [messagemErrorCpf, setMessagemErrorCpf] = useState('');
  const [messagemErrorTelefone, setMessagemErrorTelefone] = useState('');

  function closeModal() {
    setIsOpen(false);
  }

  const [form, setForm] = useState({
    nome: "",
    email: "",
    cpf: "",
    telefone: "",
    senha: "",
    senha_repetida: "",
  });



  async function handleSubmit(e) {
    e.preventDefault();

    let verificado = false
    for (let [item] of Object.entries(form)) {
      if ((item !== "")) {
        verificado = true
        break
      }

      if (!verificado) {
        return toast.error("E obrigatorio preencher um campo, incluindo a senha atual!")
      }

    }

    if (form.nome) {
      if (!((form.nome.trim().split(' ').length === 2) && (/^[a-zA-Z" "]+$/.test(form.nome)))) {
        return setMessagemErrorNome("O campo nome e sobrenome esta incorreto")
      }
    }

    setMessagemErrorNome('')

    if (form.email) {
      if ((!form.email.includes('.')) || (form.email.trim().includes(' ')) || (!form.email.includes('@'))) {
        console.log('-----------------------------------------------------');
        return setMessagemErrorEmail("O campo email esta incorreto")
      }
    }

    setMessagemErrorEmail('')

    if (form.cpf) {
      console.log(form.cpf);
      if ((form.cpf.replace(/[^0-9]/g, '').trim().length !== 11)) {
        return setMessagemErrorCpf("O campo cpf esta incorreto")
      }
    }

    setMessagemErrorCpf('')

    if (form.telefone) {
      console.log(form.telefone);
      if ((form.telefone.replace(/[^0-9]/g, '').trim().length !== 11)) {
        return setMessagemErrorTelefone("O campo telefone esta incorreto")
      }
    }

    setMessagemErrorEmail('')

    if (((form.senha))) {

      if (!form.senha_repetida) {
        return setMessagemErrorSenha("Os campos senha e repeti senha são obrigatorios")
      }

      if (!(form.senha === form.senha_repetida)) {
        return setMessagemErrorSenha("As senhas precisam ser iguais")
      }
      if (!(form.senha.length >= 8 && form.senha_repetida.length >= 8)) {
        return setMessagemErrorSenha("As senhas precisam ter no minimo 8 caracteres")
      }
    }

    if (form.senha_repetida && !form.senha) {
      return setMessagemErrorSenha("Os campos senha e repeti senha são obrigatorios")
    }

    setMessagemErrorSenha('')


    try {
      const response = await api.post('/atualizar/usuario', {
        novo_nome: form.nome,
        novo_email: form.email,
        novo_cpf: form.cpf.replace(/[^0-9]/g, '').trim(),
        novo_telefone: form.telefone.replace(/[^0-9]/g, '').trim(),
        nova_senha: form.senha,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      if (response.data) {
        console.log(response.data)
      }

      setForm({
        nome: "",
        email: "",
        cpf: "",
        telefone: "",
        senha: "",
        senha_repetida: "",
      });

      setMessagemErrorCpf('')
      setMessagemErrorEmail('')
      setMessagemErrorNome('')
      setMessagemErrorSenha('')
      setMessagemErrorTelefone('')
      setStatusVisibilidadeL(false)
      setStatusVisibilidadeR(false)

      toast.success(`Atualização do cadastro realizada com sucesso!`)
      closeModal()
    } catch (error) {
      toast.error("Erro ao fazer o cadastro, tente novamente")
      console.log(error);
    }
  }

  function handleOnChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }



  return (
    <div className="container-modal">
      <Modal
        isOpen={modalIsOpen}
        // onRequestClose={closeModal}
        contentLabel="Exemple Modal"
        overlayClassName="modal-overlay"
        className="modal-content-editar-perfil"
      >

        <div className="container-modal-main-editar-perfil">
          <div className="head">
            <div className="head-title">
              <PermIdentityIcon sx={{ width: '35px', height: '45px', color: '#1a17ba' }} />
              <h1>Editar Perfil</h1>
            </div>
            <button onClick={closeModal} className="exit">
              <CloseIcon sx={{
                width: '100%', height: '100%', color: 'black', transition: 'transform 0.2s', '&:hover': {
                  transform: 'scale(1.08)'
                }
              }} />
            </button>
          </div>
          <form className="form-adicionarP">

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
              <IMaskInput
                id="cpf"
                className="input-field"
                mask="000.000.000-00"
                placeholder="Digite o seu CPF"
                name="cpf"
                value={form.cpf}
                onChange={(e) => handleOnChange(e)}

              />
              <label for="input-field" className="input-label">CPF</label>
              <span className="input-highlight"></span>
            </div>
            {messagemErrorCpf && (<span className='mensagem-error-cadastrar'>{messagemErrorCpf}</span>)}
            <div className="input-container">
              <IMaskInput
                id="telefone"
                className="input-field"
                mask="(00) 00000-0000"
                placeholder="Digite o seu telefone"
                name="telefone"
                value={form.telefone}
                onChange={(e) => handleOnChange(e)}

              />
              <label for="input-field" className="input-label">Telefone</label>
              <span className="input-highlight"></span>
            </div>
            {messagemErrorTelefone && (<span className='mensagem-error-cadastrar'>{messagemErrorTelefone}</span>)}

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

            <div className="input-container">
              <input
                placeholder="Digite novamente a senha"
                className="input-field"
                type={!statusVisibilidadeL ? 'password' : 'text'}
                name="senha_repetida"
                value={form.senha_repetida}
                onChange={(e) => handleOnChange(e)}
              />
              <button className='btn-v' onClick={() => setStatusVisibilidadeL(!statusVisibilidadeL)} type='button'>
                {!statusVisibilidadeL ? <VisibilityOffOutlinedIcon sx={{ width: '20px', height: '20px', color: '#747488' }} /> : <RemoveRedEyeOutlinedIcon sx={{ width: '20px', height: '20px', color: '#747488' }} />}
              </button>
              <label for="input-field" className="input-label">Digite novamente a senha</label>
              <span className="input-highlight"></span>
            </div>

          </form>
          <div className="button-confirm">
            {messagemErrorSenha && (<span className='mensagem-error-cadastrar'>{messagemErrorSenha}</span>)}
            <button onClick={(e) => handleSubmit(e)} className="confirm" type="button">
              Enviar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default EditProfile;
