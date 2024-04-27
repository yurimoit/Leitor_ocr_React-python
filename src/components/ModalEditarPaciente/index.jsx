import "./styles.css";
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from "react";
import { IMaskInput } from "react-imask";
import toast from 'react-hot-toast';
import api from "../../services/api";
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';



export default function ModalEditarPaciente({ setOpenModalEditarPT, openModalEditarPT, idPaciente, dadosPaciente, setFinalizarEditarPaciente }) {


    const [errorNome, setErrorNome] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorCPF, setErrorCPF] = useState('');
    const [errorTelefone, setErrorTelefone] = useState('');
    const [errorDataNascimento, setErrorDataNascimento] = useState('');
    const [cep, setCep] = useState('')
    const [erroCep, setErroCep] = useState(false)
    const [erroEstado, setErroEstado] = useState("");
    const [id, setId] = useState(null)

    const [form, setForm] = useState({
        nome: '',
        email: '',
        data_nascimento: '',
        sexo: '',
        cpf: '',
        telefone: '',
        logradouro: '',
        cidade: '',
        estado: '',
        bairro: '',
        complemento: ''
    })


    useEffect(() => {
        if (dadosPaciente) {
            setForm({
                nome: dadosPaciente['nome'],
                email: dadosPaciente['email'],
                data_nascimento: formataData(dadosPaciente['data_nascimento']),
                sexo: dadosPaciente['sexo'],
                cpf: dadosPaciente['cpf'],
                telefone: dadosPaciente['telefone'],
                logradouro: dadosPaciente['logradouro'],
                cidade: dadosPaciente['cidade'],
                estado: dadosPaciente['estado'],
                bairro: dadosPaciente['bairro'],
                complemento: dadosPaciente['complemento']
            })
            if (dadosPaciente['cep']) {
                setCep(dadosPaciente['cep'])
            }
        }
        setId(idPaciente)
    }, [idPaciente, dadosPaciente])


    function formataData(d) {
        if (d) {
            var dataString = d;

            // Converter a string para um objeto Date
            var data = new Date(dataString);

            // Obter ano, mês e dia
            var ano = data.getFullYear();
            var mes = ("0" + (data.getMonth() + 1)).slice(-2); // Adiciona um zero à esquerda, se necessário
            var dia = ("0" + (data.getDate() + 1)).slice(-2); // Adiciona um zero à esquerda, se necessário

            // Formatar a data no formato ano-mes-dia
            var dataFormatada = ano + "-" + mes + "-" + dia;

            return dataFormatada
        }

        return "Sem data"
    }


    useEffect(() => {

    }, [idPaciente])


    async function viaCep(cep) {
        try {
            if (cep) {
                const response = await api.get(`/buscarcep?codigoPostal=${cep}`);

                // console.log(response);

                if (response.data) {
                    // console.log("CEP: ", response.data);
                    setForm({
                        ...form,
                        bairro: response.data.district,
                        logradouro: response.data.street,
                        cidade: response.data.city,
                        estado: response.data.uf
                    })
                    setErroCep("");
                }
            }

        } catch (error) {
            if (error) {
                setErroCep(true)
            }
            return
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
        setErrorDataNascimento('')
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

            if (!form.data_nascimento) {
                document.getElementById('data_nascimento').style.border = '1.5px solid red'
                setErrorDataNascimento("Campo data de nascimento e obrigatorio!")
                return
            }


            // eslint-disable-next-line 
            const response = await api.put('/atualizar/paciente', {
                id: id,
                nome: form.nome,
                email: form.email,
                data_nascimento: form.data_nascimento,
                sexo: form.sexo,
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
                    Authorization: `Bearer ${localStorage.getItem('E%H6%2&6GB8UU!UZ3XncHd')}`
                }
            });

            // console.log(response);

            setForm({
                nome: '',
                email: '',
                data_nascimento: '',
                sexo: '',
                cpf: '',
                telefone: '',
                logradouro: '',
                cidade: '',
                estado: '',
                bairro: '',
                complemento: ''
            });
            setCep('');
            setOpenModalEditarPT(false)
            setFinalizarEditarPaciente("success")

        } catch (error) {
            if (error && error.response) {
                toast.error(error.response.data.mensagem);
            }
            setFinalizarEditarPaciente("error")
            return;
        }
    }




    return (
        <div>
            <Modal
                open={openModalEditarPT}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="modal"
            >
                <div className="borda-cadastra-paciente" >
                    <div className="modal-content-cadastra-paciente">
                        <div className="titulo-cadastrar-paciente">
                            <div>
                                <PeopleOutlineIcon sx={{ width: '36px', height: '36px', color: 'rgb(15, 88, 165)' }} />
                                <h1>Editar dados</h1>
                            </div>
                            <button type="button" onClick={() => setOpenModalEditarPT(false)}>
                                <CloseIcon sx={{ width: '100%', height: '100%', color: 'black' }} />
                            </button>
                        </div>

                        <form className="input-modal-cadastra-paciente"  >
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

                            <section className="form-dataNascimento-sexo">
                                <div className="form-data-nascimento">
                                    <label>Data nascimento: </label>
                                    <input
                                        id="data_nascimento"
                                        type="date"
                                        name="data_nascimento"
                                        value={form.data_nascimento}
                                        placeholder="Digite a data do seu nascimento"
                                        onChange={(e) => handleOnchage(e)}

                                    />
                                    <span>{errorDataNascimento}</span>
                                </div>

                                <div className="form-cadastra-paciente-sexo">
                                    <label for="opcao1">Feminino</label>
                                    <input
                                        type="radio"
                                        id="opcao1"
                                        name="sexo"
                                        value="F"
                                        checked={form.sexo === "F"}
                                        onChange={(e) => handleOnchage(e)}
                                    />

                                    <label for="opcao2">Masculino</label>
                                    <input
                                        type="radio"
                                        id="opcao2"
                                        name="sexo"
                                        value='M'
                                        checked={form.sexo === "M"}
                                        onChange={(e) => handleOnchage(e)}
                                    />
                                </div>

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
                            <button type='button1' onClick={() => setOpenModalEditarPT(false)} className="btn-cancelar">
                                Cancelar
                            </button>
                            <button onClick={(e) => handleSubmit(e)} type="submit" className="btn-aplicar">
                                Aplicar
                            </button>
                        </section>
                    </div>
                </div>

            </Modal>
        </div >
    );
}
