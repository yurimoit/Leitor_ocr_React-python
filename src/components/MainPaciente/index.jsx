
import { useEffect, useState } from 'react';
import './styles.css';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { MdCloudUpload, MdDelete } from 'react-icons/md';
import { AiFillFileImage } from 'react-icons/ai'
import EditIcon from '@mui/icons-material/Edit';
import imagenPdf from '../../assets/pdfimagem.png'
import imagemTxT from '../../assets/imagemTXT.png'
import imagemCSV from '../../assets/imagemCSV.png'
import imagemXLS from '../../assets/imagemXLS.png'
import imagemDOCX from '../../assets/imagemDOCX.png'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Loaders } from '../Loader';
import AnimationsPerfil from '../LoadersAnimatons/index2';
import { useNavigate } from 'react-router-dom';
import ModalEditarPaciente from '../ModalEditarPaciente';


export default function MainPaciente({ setUsuario, modalIsOpen }) {
    const [file, setFile] = useState('');
    const [
        // eslint-disable-next-line
        imageNome, setImageNome] = useState('');
    const [
        // eslint-disable-next-line
        nomeTexto, setNomeTexto] = useState('');
    const [url, setUrl] = useState('')
    const [observacaoGerada, setObservacaoGerada] = useState(['Sem observações']);
    const [verificadoTempo, setVerificadorTempo] = useState(false)
    const [
        // eslint-disable-next-line
        isVerificacao, setIsVerificacao] = useState(false)
    const navgate = useNavigate()

    const [image, setImage] = useState(null)
    const [fileName, setFileName] = useState("No selected file")
    const [nomeExame, setNomeExame] = useState("")
    const [informacoesGerado, setInformacoeGerado] = useState([])
    const [tempoEnvio, setTempoEnvio] = useState(false)
    const [tempoEnvioArquivo, setTempoEnvioArquivo] = useState(false)
    const [tempoEnvioArquivo2, setTempoEnvioArquivo2] = useState(false)
    const [finalizarEditarPaciente, setFinalizarEditarPaciente] = useState('')
    const [finalizarCadastroExame, setFinalizarCadastroExame] = useState('')
    const [openModalEditarPT, setOpenModalEditarPT] = useState(false)
    const [idPaciente, setIdPaciente] = useState(null)
    const [dadosPaciente, setDadosPaciente] = useState([])
    const [informacaoUsuario, setIformacaoUsuario] = useState({
        0: 0,
        1: "",
        2: "",
        4: false,
        5: "",
        6: ""
    })
    const [dataExame, setDataExame] = useState('')

    function openModalEditarPaciente() {
        setOpenModalEditarPT(true)
    }


    function formataData(dateString) {

        dateString = String(dateString)
        const date = new Date(dateString);
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    function calculaIdade(d = '0000-00-00') {

        let ano = d.slice(0, 4)
        let mes = d.slice(5, 7)
        let dia = d.slice(8)

        let dataAtual = new Date()
        let dataAtualANO = dataAtual.getFullYear()
        let dataAtualMES = dataAtual.getMonth()
        let dataAtualDIA = dataAtual.getDate()
        let idade = null

        let diferencaANO = Number(dataAtualANO) - Number(ano)
        let diferencaMES = Number(dataAtualMES) - Number(mes)
        let diferencaDIA = Number(dataAtualDIA) - Number(dia)


        if (diferencaMES < 0) {
            idade = diferencaANO - 1
        } else if (diferencaMES > 0) {
            idade = diferencaANO
        } else if (diferencaMES === 0 && diferencaDIA < 0) {
            idade = diferencaANO - 1
        } else if (diferencaMES === 0 && diferencaDIA > 0) {
            idade = diferencaANO - 1
        } else if (diferencaMES === 0 && diferencaDIA === 0) {
            idade = diferencaANO
        }

        // console.log("ANO-MES-DIA", ano, mes, dia);
        // console.log("DATA ATUAL", dataAtual);
        // console.log("IDADE", idade);
        return idade
    }


    const handleInputChange = (event, index) => {
        const { name, value } = event.target;
        const list = [...informacoesGerado];
        if (!isNaN(value.replace(',', '.'))) {
            list[index][name] = value;
            setInformacoeGerado(list);
            verificaCampo()
            return
        }

        list[index][name] = value;
        setInformacoeGerado(list);
        verificaCampo()
    }


    function clearInput() {
        if (informacoesGerado) {
            let lista = [...informacoesGerado]
            for (let objeto of lista) {
                for (let chave of Object.keys(objeto)) {
                    if (chave === 'nome' || chave === 'unidade') {
                        continue
                    }
                    objeto[chave] = '--'
                }
            }
            setInformacoeGerado(lista)
            verificaCampo()
        }

        if (observacaoGerada) {
            setObservacaoGerada('')
        }

        if (nomeExame) {
            setNomeExame('')
        }

        if (dataExame) {
            setDataExame('')
        }
    }


    async function obterUsuario() {
        try {
            if (!localStorage.getItem('BcD#p%swmmE6e%dR9UJK^kqBi@JMtf27')) {
                const response = await api.get('/obter/usuario', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('E%H6%2&6GB8UU!UZ3XncHd')}`
                    }
                })

                if (response.data) {
                    // console.log("Dados do get:", response.data);
                    setIformacaoUsuario(response.data)
                    setUsuario(response.data)
                }

                setVerificadorTempo(true)
            } else {
                const response = await api.get('/obter/usuario', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('E%H6%2&6GB8UU!UZ3XncHd')}`
                    }
                })

                if (response.data) {
                    // console.log("Dados do get:", response.data);
                    setUsuario(response.data)
                }

            }
        } catch (error) {
            toast.error("Não foi possivel obter usuario")
        }
    }

    async function obterPaciente() {
        try {
            if (localStorage.getItem('BcD#p%swmmE6e%dR9UJK^kqBi@JMtf27')) {
                const response = await api.get(`/obter/paciente?id=${localStorage.getItem('SMoYgVd$Q6Qf2#g@fG5XTgH') ? localStorage.getItem('SMoYgVd$Q6Qf2#g@fG5XTgH') : null}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('E%H6%2&6GB8UU!UZ3XncHd')}`
                    }
                })

                if (response.data) {
                    // console.log("Dados do get:", response.data);
                    setIformacaoUsuario(response.data)
                    setDadosPaciente(response.data[0])
                    console.log("DATA: ", response.data[0]);
                    setIdPaciente(localStorage.getItem('SMoYgVd$Q6Qf2#g@fG5XTgH'))
                }

                setVerificadorTempo(true)
            }
        } catch (error) {
            // console.log(error.response.data.validador);
            if (error && error.response.data.validador === false) {
                localStorage.removeItem('E%H6%2&6GB8UU!UZ3XncHd')
                localStorage.removeItem('BcD#p%swmmE6e%dR9UJK^kqBi@JMtf27')
                localStorage.removeItem('SMoYgVd$Q6Qf2#g@fG5XTgH')
                navgate('/')
            }
            toast.error("Não foi possivel obter paciente")
        }
    }

    useEffect(() => {

        setTimeout(() => {
            obterPaciente()
        }, 1000)
    },
        // eslint-disable-next-line
        [openModalEditarPT])


    useEffect(() => {
        if (finalizarEditarPaciente) {
            setTimeout(() => {
                setFinalizarEditarPaciente("")
            }, 2500)
        }
    }, [finalizarEditarPaciente])

    useEffect(() => {
        if (finalizarCadastroExame) {
            setTimeout(() => {
                setFinalizarCadastroExame("")
            }, 3000)
        }
    }, [finalizarCadastroExame])


    useEffect(() => {
        if (!localStorage.getItem('BcD#p%swmmE6e%dR9UJK^kqBi@JMtf27')) {
            obterUsuario()
        }
    },
        // eslint-disable-next-line 
        [modalIsOpen])

    useEffect(() => {
        if (localStorage.getItem('BcD#p%swmmE6e%dR9UJK^kqBi@JMtf27')) {
            setIsVerificacao(true)
        }
    }, [])


    // console.log('Pacientes gerados: ', informacaoUsuario[0]);

    async function handleUploadFormData() {
        if (!file) {
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await api.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multpart/form-data'
                }
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('E%H6%2&6GB8UU!UZ3XncHd')}`
                }
            });

            // console.log(response);

            const { filename } = response.data;
            setImageNome(filename);

            toast.success(`Enviado com sucesso!`);
            setTempoEnvioArquivo2(true)
            getTexto()

        } catch (error) {
            toast.error("Error ao enviar a imagem!")
            // console.log(error);
        }
    }


    async function getTexto() {
        try {
            const response = await api.get('/getLeitura', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('E%H6%2&6GB8UU!UZ3XncHd')}`
                }
            });

            // console.log(response);

            const { nome_exame, url_exame, lista_dados, observacao
            } = response.data;
            setNomeTexto(nome_exame);
            setObservacaoGerada(observacao);
            setInformacoeGerado(lista_dados)
            setUrl(url_exame);
            setTempoEnvioArquivo(true)
        } catch (error) {
            setTempoEnvioArquivo(false)
            setTempoEnvioArquivo2(false)
            setFinalizarCadastroExame("error")
        }
    }

    function verificaCampo(borda = "4px solid red") {
        let verifica = true

        if (informacoesGerado) {
            let lista = [...informacoesGerado]
            for (let objeto of lista) {
                for (let chave of Object.keys(objeto)) {
                    if (chave === 'nome' || chave === 'unidade') {
                        continue
                    }

                    if (isNaN((objeto[chave]))) {
                        document.getElementById(objeto['nome']).style.border = borda
                        verifica = false
                        break
                    } else {
                        document.getElementById(objeto['nome']).style.border = 'none'
                    }
                }
            }
        }

        return verifica
    }



    async function sendFormData() {
        verificaCampo()

        if (!nomeExame || !observacaoGerada || !dataExame) {
            toast.error('Todos os campos são obrigatorios')
            return
        }

        if (!verificaCampo()) {
            return toast.error('Todos os campos sao obrigatorios')
        }

        try {
            const response = await api.post('/dados/exames', {
                resposta: {
                    'id_paciente': localStorage.getItem('SMoYgVd$Q6Qf2#g@fG5XTgH') ? localStorage.getItem('SMoYgVd$Q6Qf2#g@fG5XTgH') : null,
                    'nome_exame': nomeExame,
                    'url_exame': url,
                    'lista_dados': informacoesGerado,
                    'observacao': observacaoGerada,
                    'data_exame': dataExame,
                    "nome_paciente": Boolean(localStorage.getItem('BcD#p%swmmE6e%dR9UJK^kqBi@JMtf27')) ? dadosPaciente['nome'] : informacaoUsuario[1],
                    "data_nascimento": Boolean(localStorage.getItem('BcD#p%swmmE6e%dR9UJK^kqBi@JMtf27')) ? dadosPaciente['data_nascimento'] : null,
                    "sexo": Boolean(localStorage.getItem('BcD#p%swmmE6e%dR9UJK^kqBi@JMtf27')) ? dadosPaciente['sexo'] : "I",
                }
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('E%H6%2&6GB8UU!UZ3XncHd')}`
                }
            })

            if (response && response.data) {
                // console.log(response.data);
            }
            setTempoEnvio(true)
        } catch (error) {
            // console.log(error);
            if (error.response && error.response.data.mensagem) {
                toast.error(error.response.data.mensagem)
            }
        }

    }

    useEffect(() => {
        if (tempoEnvio) {
            setTimeout(() => {
                setTempoEnvio(false)
                setInformacoeGerado()
                setUrl('')
                setNomeTexto('')
                setImage(null)
                setFile(null)
                setNomeExame('')
                setFileName("No selected file")
                setFinalizarCadastroExame("success")
            }, 2500)
        }
        if (tempoEnvioArquivo && tempoEnvioArquivo2) {
            setTimeout(() => {
                setTempoEnvioArquivo(false)
                setTempoEnvioArquivo2(false)
                toast.success(`Gerador texto com sucesso!!`)
            }, 2500)
        }
    }, [tempoEnvio, tempoEnvioArquivo, image, tempoEnvioArquivo2])




    return (
        <div className='app-main-paciente'>
            <ModalEditarPaciente
                openModalEditarPT={openModalEditarPT}
                setOpenModalEditarPT={setOpenModalEditarPT}
                idPaciente={idPaciente}
                dadosPaciente={dadosPaciente}
                setFinalizarEditarPaciente={setFinalizarEditarPaciente}
            />

            <section className='informacoes-paciente'>
                {!verificadoTempo && (<AnimationsPerfil />)}
                {verificadoTempo && (
                    <>
                        {Boolean(localStorage.getItem('BcD#p%swmmE6e%dR9UJK^kqBi@JMtf27')) && (
                            <>
                                <div className='informacoes-paciente-nome'>
                                    <h1>Informações do Paciente:</h1>
                                    <h2>Nome: {dadosPaciente['nome'] ? dadosPaciente['nome'][0].toUpperCase() + dadosPaciente['nome'].slice(1) : "-----"}</h2>
                                </div>
                                <div className='informacoes-paciente-dados'>
                                    <ul>
                                        <li>CPF :  {dadosPaciente['cpf'] ? dadosPaciente['cpf'] ? (dadosPaciente['cpf'].slice(0, 3) + "." + dadosPaciente['cpf'].slice(3, 6) + "." + dadosPaciente['cpf'].slice(6, 9) + "-" + dadosPaciente['cpf'].slice(9)) : ("") : ""}</li>
                                        <li>E-mail : {dadosPaciente['email']}</li>
                                    </ul>
                                    <ul>
                                        <li>Idade : {dadosPaciente['data_nascimento'] ? calculaIdade(formataData(dadosPaciente['data_nascimento'])) : '---'} anos </li>
                                        <li>Sexo : {dadosPaciente['sexo'] ? dadosPaciente['sexo'] : '---'} </li>
                                    </ul>
                                    <ul>
                                        <li>Telefone : {dadosPaciente['telefone'] ? dadosPaciente['telefone'] ? ("(" + dadosPaciente['telefone'].slice(0, 2) + ") " + dadosPaciente['telefone'].slice(2, 7) + "-" + dadosPaciente['telefone'].slice(7)) : ("") : ""}</li>
                                        <li>Cidade : {dadosPaciente['cidade'] ? dadosPaciente['cidade'] : '---'}</li>
                                    </ul>
                                    <ul>
                                        <li>UF : {dadosPaciente['estado'] ? dadosPaciente['estado'] : '---'}</li>
                                        <li>CEP : {dadosPaciente['cep'] ? dadosPaciente['cep'].slice(0, 5) + "-" + dadosPaciente['cep'].slice(5) : '---'}</li>
                                    </ul>
                                    <div>
                                        <button onClick={() => openModalEditarPaciente()}>
                                            EDITAR
                                            <EditIcon sx={{ color: '#fff', width: '20px', height: '20px' }} />
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                        {!Boolean(localStorage.getItem('BcD#p%swmmE6e%dR9UJK^kqBi@JMtf27')) && (
                            <>
                                <div className='informacoes-paciente-nome'>
                                    <h1>Informações do Paciente:</h1>
                                    <h2>Nome: {informacaoUsuario[1] ? informacaoUsuario[1][0].toUpperCase() + informacaoUsuario[1].slice(1) : "-----"}</h2>
                                </div>
                                <div className='informacoes-paciente-dados'>
                                    <ul>
                                        <li>CPF :  {informacaoUsuario[5] ? informacaoUsuario[5] ? (informacaoUsuario[5].slice(0, 3) + "." + informacaoUsuario[5].slice(3, 6) + "." + informacaoUsuario[5].slice(6, 9) + "-" + informacaoUsuario[5].slice(9)) : ("") : ""}</li>

                                    </ul>
                                    <ul>
                                        <li>E-mail : {informacaoUsuario[2]}</li>
                                    </ul>
                                    <ul>
                                        <li>Sexo : {"I"}</li>
                                    </ul>
                                    <ul>
                                        <li>Idade : {"Add Lógica"}</li>
                                    </ul>
                                    <ul>
                                        <li>Telefone : {informacaoUsuario[6] ? informacaoUsuario[6] ? ("(" + informacaoUsuario[6].slice(0, 2) + ") " + informacaoUsuario[6].slice(2, 7) + "-" + informacaoUsuario[6].slice(7)) : ("") : ""}</li>

                                    </ul>
                                </div>
                            </>
                        )}
                    </>
                )}
            </section>
            <div className='formulario-dados-exame'>
                <div className='cadastra-exama-usuario'>
                    <div className='envia-arquivo-exame'>

                        <div className='paciente-higth-photos-form'>
                            <form className='form-file'
                                onClick={() => document.querySelector(".input-field-documentos-file").click()}
                            >
                                <input type='file' accept='image/*, .pdf, .docx, .txt, .csv, .xls'
                                    className='input-field-documentos-file'
                                    hidden
                                    onChange={({ target: { files } }) => {
                                        files[0] && setFileName(files[0].name)
                                        if (files) {
                                            setNomeExame(files[0].name)
                                            setFile(files[0])
                                            console.log(files[0].name)
                                            if (((files[0].name).includes(('.jpeg'))) || ((files[0].name).includes(('.png'))) || ((files[0].name).includes(('.jpg')))) {
                                                setImage(URL.createObjectURL(files[0]))
                                            } else {
                                                setImage(null)
                                            }
                                        }
                                    }}
                                />

                                {image ?
                                    (<img src={image} width={250} height={150} alt={fileName} />)
                                    :
                                    (
                                        <>
                                            {
                                                fileName.includes("No selected file") && (
                                                    <>
                                                        <MdCloudUpload color='#1475cf' size={60} />
                                                        <p >Browse Files to upload</p>
                                                    </>
                                                )
                                            }
                                        </>
                                    )
                                }
                                {fileName.includes('.pdf') && (
                                    <img width={250} height={150} src={imagenPdf} alt='foto-text' />
                                )
                                }
                                {fileName.includes('.txt') && (
                                    <img width={250} height={150} src={imagemTxT} alt='foto-text' />
                                )
                                }
                                {fileName.includes('.docx') && (
                                    <img width={250} height={150} src={imagemDOCX} alt='foto-text' />
                                )
                                }
                                {fileName.includes('.csv') && (
                                    <img width={250} height={150} src={imagemCSV} alt='foto-text' />
                                )
                                }
                                {fileName.includes('.xls') && (
                                    <img width={250} height={150} src={imagemXLS} alt='foto-text' />
                                )
                                }
                            </form>

                            <section className='uploaded-row'>
                                <AiFillFileImage color='#1475cf' />
                                <span className='upload-content'>
                                    {fileName}
                                </span>
                                <MdDelete
                                    style={{
                                        cursor: 'pointer', width: '24px', height: '24px', color: 'red'
                                    }}
                                    onClick={() => {
                                        setFileName('No select File')
                                        setImage(null)
                                    }}
                                />
                            </section>
                        </div>

                        <div className='envia-arquivo-exame-div'>
                            <button
                                type='button'
                                className='btn-purple'
                                onClick={() => handleUploadFormData()}
                            >
                                Upload photo
                            </button>
                        </div>


                    </div>
                    {(tempoEnvio || tempoEnvioArquivo || tempoEnvioArquivo2) && (
                        <div className='loard-temporizado'>
                            <Loaders />
                        </div>)}
                    {!(tempoEnvio || tempoEnvioArquivo || tempoEnvioArquivo2) && (
                        <div className='text-gerado-arquivo-exame'>
                            <div className='form-exame-tiulo'>
                                <aside>
                                    <form className='form-nome-exame'>
                                        <label>Nome do exame : </label>
                                        <input
                                            className='form-nome-exame-input'
                                            placeholder='Hemograma'
                                            maxlength="100"
                                            type='text'
                                            value={nomeExame}
                                            onChange={(e) => setNomeExame(e.target.value)}
                                        />
                                    </form>
                                </aside>
                                <div className='form-exame-data'>
                                    <label>Data : </label>
                                    <input
                                        type='date'
                                        placeholder=''
                                        value={dataExame}
                                        onChange={(e) => setDataExame(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className='form-exame-dados'>
                                <form>
                                    <div className='form-dados'>
                                        {(Array.isArray(informacoesGerado)) && (
                                            <section>
                                                {informacoesGerado.map((item, index) => (
                                                    <div id={`${informacoesGerado[index][`nome`]}`} key={index} className='form-dados-input-div'>
                                                        <label>{informacoesGerado[index][`nome`]}: </label>
                                                        <form className='form-dados-exames-gerado'>
                                                            <div>
                                                                <input
                                                                    type='text'
                                                                    name='valorPR'
                                                                    placeholder={`0.0`}
                                                                    value={informacoesGerado[index][`valorPR`]}
                                                                    onChange={(e) => handleInputChange(e, index)}
                                                                />
                                                                <span>{informacoesGerado[index][`unidade`]}</span>
                                                                {(Object.keys(informacoesGerado[index]).includes('mm3')) && (
                                                                    <>
                                                                        <input
                                                                            type='text'
                                                                            name='mm3'
                                                                            placeholder={`0.0`}
                                                                            value={informacoesGerado[index][`mm3`]}
                                                                            onChange={(e) => handleInputChange(e, index)}
                                                                        />
                                                                        <span>/mm³</span>
                                                                    </>
                                                                )}
                                                            </div>
                                                            <div className='div-valor-referencia' >
                                                                <div className='div-span-valor-referencia'>
                                                                    <span>Referência:</span>
                                                                </div>
                                                                <div>
                                                                    <input
                                                                        type='text'
                                                                        name='valoRA'
                                                                        placeholder={`0.0`}
                                                                        value={informacoesGerado[index][`valoRA`]}
                                                                        onChange={(e) => handleInputChange(e, index)}
                                                                    />
                                                                    <span className='span-valor-referencia'>  a  </span>
                                                                    <input
                                                                        type='text'
                                                                        name='valorB'
                                                                        placeholder={`0.0`}
                                                                        value={informacoesGerado[index][`valorB`]}
                                                                        onChange={(e) => handleInputChange(e, index)}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                ))}
                                                <form className='form-obs-exame-gerado'>
                                                    <label>Nota: </label>
                                                    <textarea
                                                        id="textoArea"
                                                        rows="4"
                                                        cols="150"
                                                        value={observacaoGerada ? observacaoGerada : ""}
                                                        onChange={(e) => setObservacaoGerada(e.target.value)}
                                                    >{observacaoGerada ? observacaoGerada : " Sem observações"}</textarea>
                                                </form>
                                            </section>

                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
                <div className='form-exame-tiulo-nav'>
                    <button onClick={() => clearInput()} style={{ backgroundColor: '#dbd117', color: 'black' }}>Limpar</button>
                    <button onClick={() => sendFormData()} style={{ backgroundColor: 'green' }}>enviar</button>
                </div>
            </div>
            {finalizarEditarPaciente && (
                <div className="alert-CB">
                    <Stack sx={{
                        width: '21%',
                        boxShadow: `3px 3px 5px black `,
                        borderRadius: "10px",
                        border: "none",
                        opacity:'0.95'
                    }} spacing={2}>
                        <Alert variant="filled" severity={finalizarEditarPaciente} sx={{
                            width: "100%",
                            height: "100%",
                            fontSize: "1.8rem",
                            fontFamily: "Nunito sans-serif",
                            display: "flex",
                            alignItems: "center",
                            border: "none"
                        }}>
                            {finalizarEditarPaciente === 'success' ? 'Atualização concluida com sucesso!' : "Erro na atualização!"}
                        </Alert>
                    </Stack>
                </div>
            )}
            {finalizarCadastroExame && (
                <div className="alert-CB">
                    <Stack sx={{
                        width: '21%',
                        boxShadow: `3px 3px 5px black `,
                        borderRadius: "10px",
                        border: "none",
                        opacity:'0.95'
                    }} spacing={2}>
                        <Alert variant="filled" severity={finalizarCadastroExame} sx={{
                            width: "100%",
                            height: "100%",
                            fontSize: "1.8rem",
                            fontFamily: "Nunito sans-serif",
                            display: "flex",
                            alignItems: "center",
                            border: "none"
                        }}>
                            {finalizarCadastroExame === 'success' ? 'Exame cadastrado com sucesso!' : "Erro na extração de dados!"}
                        </Alert>
                    </Stack>
                </div>
            )}
        </div>
    );
}