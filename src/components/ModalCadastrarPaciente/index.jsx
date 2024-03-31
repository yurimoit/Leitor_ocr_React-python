import "./styles.css";
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import { useState } from "react";
import { IMaskInput } from "react-imask";
import toast from 'react-hot-toast';
import api from "../../services/api";
import clienteLigh from '../../assets/clienteLigh.svg';





export default function ModalCadastrarPaciente({ setOpenModalCDPT, openModalCDPT, setFinalizarCDCliente }) {


    const [errorNome, setErrorNome] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorCPF, setErrorCPF] = useState('');
    const [errorTelefone, setErrorTelefone] = useState('');
    const [cep, setCep] = useState('')
    const [erroCep, setErroCep] = useState(false)
    const [erroEstado, setErroEstado] = useState("");

    const [form, setForm] = useState({
        nome: '',
        email: '',
        cpf: '',
        telefone: '',
        logradouro: '',
        cidade: '',
        estado: '',
        bairro: '',
        complemento: ''
    })


    async function viaCep(cep) {
        try {
            if (cep) {
                const response = await api.get(`/buscarcep?codigoPostal=${cep}`);

                console.log(response);

                if (response.data) {
                    setForm({
                        ...form,
                        bairro: response.data.neighborhood,
                        logradouro: response.data.street,
                        cidade: response.data.city,
                        estado: response.data.state
                    })
                    setErroCep("");
                }
            }

        } catch (error) {
            if (error) {
                setErroCep(true)
            }
            return console.log(error);
        }
    }



    function xpto(e) {
        e.preventDefault()
        setErroCep(false)
        const cepLimpo = e.target.value.replace(/\D/g, '');
        setCep(cepLimpo);
        if (cepLimpo.length === 8) {
            const cepFormatado = cepLimpo;
            viaCep(cepFormatado)
        }
    }




    function handleOnchage(e) {

        setForm({ ...form, [e.target.name]: e.target.value });


        setErrorNome('');
        setErrorEmail('')
        setErrorCPF('');
        setErrorTelefone('');
        setErroEstado('');
        document.querySelectorAll('input').forEach((inputElement) => {
            inputElement.style.border = '1.5px solid #7b7979a6';
        });

    }


    async function handleSubmit(e) {
        e.preventDefault();

        try {
            if (!form.email || !form.nome || !form.cpf || !form.telefone) {
                return toast.error('Preencha todo os campos obrigatorios!');
            }

            if (!form.nome.trim().includes(' ')) {
                document.getElementById('nome').style.border = '1.5px solid red'
                setErrorNome('Preencha o campo Nome e sobrenome corretamente!');
                return;
            }

            if (!form.email.includes('@') || !form.email.includes('.')) {
                document.getElementById('email').style.border = '1.5px solid red'
                setErrorEmail('Preencha o campo email corretamente!');
                return;
            }

            if (form.cpf && (form.cpf.replace(/[^0-9]/g, '').length !== 11)) {
                setErrorCPF('O campo CPF precisa conter 11 números!');
                document.getElementById('cpf').style.border = '1.5px solid red'
                return;
            }

            if (form.telefone && (form.telefone.replace(/[^0-9]/g, '').length !== 11)) {
                setErrorTelefone('O campo Telefone precisa conter 11 números!');
                document.getElementById('telefone').style.border = '1.5px solid red'
                return;
            }

            if (cep && (cep.replace(/[^0-9]/g, '').length !== 8)) {
                setErroCep('O campo Cep precisa conter 8 números!');
                document.getElementById('cep').style.border = '1.5px solid red'
                return;
            }

            if (form.estado.trim().length !== 2) {
                setErroEstado('O campo Estado dever conter apenas a sigla!');
                document.getElementById('estado').style.border = '1.5px solid red'
                return;
            }



            const response = await api.post('/cadastrar/cliente', {
                nome: form.nome,
                email: form.email,
                cpf: form.cpf.replace(/[^0-9]/g, ''),
                telefone: form.telefone.replace(/[^0-9]/g, ''),
                cep: cep.replace(/[^0-9]/g, ''),
                logradouro: form.logradouro,
                complemento: form.complemento,
                bairro: form.bairro,
                cidade: form.cidade,
                estado: form.estado
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            console.log(response);

            setForm({
                nome: '',
                email: '',
                cpf: '',
                telefone: '',
                logradouro: '',
                cidade: '',
                estado: '',
                bairro: '',
                complemento: ''
            });
            setCep('');
            setOpenModalCDPT(false)
            setFinalizarCDCliente(true);

        } catch (error) {
            if (error.response.data.mensagem) {
                toast.error(error.response.data.mensagem);
            }
            return;
        }
    }



    return (
        <div>
            <Modal
                open={openModalCDPT}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="modal"
            >
                <div className="borda-cadastra-paciente" >
                    <div className="modal-content-cadastra-paciente">
                        <div className="titulo-cadastrar-paciente">
                            <div>
                                <img src={clienteLigh} alt='cliente-dark' />
                                <h1>Cadastrar de paciente</h1>
                            </div>
                            <button type="button" onClick={() => setOpenModalCDPT(false)}>
                                <CloseIcon sx={{ width: '100%', height: '100%', color: 'black' }} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="input-modal-cadastra-paciente"  >
                            <section className="input-section-cadastra-paciente">
                                <label>Nome e sobrenome*</label>
                                <input
                                    id="nome"
                                    type="text"
                                    name="nome"
                                    value={form.nome}
                                    placeholder="Digite seu nome"
                                    onChange={(e) => handleOnchage(e)}

                                />
                                <span style={{ marginBottom: '20px' }}>{errorNome}</span>

                                <label>E-mail*</label>
                                <input
                                    id="email"
                                    type="text"
                                    name="email"
                                    value={form.email}
                                    placeholder="Digite seu e-mail"
                                    onChange={(e) => handleOnchage(e)}

                                />
                                <span > {errorEmail}</span>
                            </section>


                            <section className="cpf-telefone-cadastra-paciente">
                                <div>
                                    <label>CPF*</label>
                                    <IMaskInput
                                        id="cpf"
                                        mask="000.000.000-00"
                                        placeholder="Digite o seu CPF"
                                        name="cpf"
                                        value={form.cpf}
                                        onChange={(e) => handleOnchage(e)}

                                    />
                                    <span > {errorCPF}</span>
                                </div>
                                <div>
                                    <label>Telefone*</label>
                                    <IMaskInput
                                        id="telefone"
                                        mask="(00) 00000-0000"
                                        placeholder="Digite o seu telefone"
                                        name="telefone"
                                        value={form.telefone}
                                        onChange={(e) => handleOnchage(e)}

                                    />
                                    <span >{errorTelefone}</span>
                                </div>
                            </section>
                            <section className="cpf-telefone-cadastra-paciente">
                                <div>
                                    <label>CEP</label>
                                    <input
                                        id="cep"
                                        maxLength={8}
                                        placeholder="Digite o seu CEP"
                                        value={cep.replace(/(\d{5})(\d{3})/, '$1-$2')}
                                        onChange={xpto}

                                    />
                                    {erroCep && (<span style={{ marginBottom: '20px' }}>CEP não encontrado</span>)}
                                </div>
                                <div>
                                    <label>Bairro</label>
                                    <input
                                        type="text"
                                        name="bairro"
                                        value={form.bairro}
                                        placeholder="Digite seu Bairro"
                                        onChange={(e) => handleOnchage(e)}

                                    />
                                </div>
                            </section>
                            <section className="cpf-telefone-cadastra-paciente">
                                <div>
                                    <label>Cidade</label>
                                    <input
                                        type="text"
                                        name="cidade"
                                        value={form.cidade}
                                        placeholder="Digite sua cidade"
                                        onChange={(e) => handleOnchage(e)}

                                    />
                                </div>
                                <div>
                                    <label>UF :</label>
                                    <input
                                        id="estado"
                                        type="text"
                                        name="estado"
                                        value={form.estado}
                                        placeholder="Difite sua UF"
                                        onChange={(e) => handleOnchage(e)}

                                    />
                                    <span>{erroEstado}</span>

                                </div>
                            </section>

                            <section className="input-section-cadastra-paciente">
                                <label>Logradouro :</label>
                                <input style={{ marginBottom: '20px' }}
                                    type="text"
                                    name="logradouro"
                                    value={form.logradouro}
                                    placeholder="Digite seu logradouro"
                                    onChange={(e) => handleOnchage(e)}

                                />

                                <label>Complemento :</label>
                                <input
                                    type="text"
                                    name="complemento"
                                    value={form.complemento}
                                    placeholder="Digite complemento"
                                    onChange={(e) => handleOnchage(e)}

                                />
                            </section>

                        </form>
                        <section className="bnts-cliente">
                            <button type='button1' onClick={() => setOpenModalCDPT(false)} className="btn-cancelar">
                                Cancelar
                            </button>
                            <button type="submit" className="btn-aplicar">
                                Aplicar
                            </button>
                        </section>
                    </div>
                </div>

            </Modal>
        </div >
    );
}
