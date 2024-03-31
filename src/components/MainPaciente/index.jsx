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
import { Loaders } from '../Loader';
import AnimationsPerfil from '../LoadersAnimatons/index2';


export default function MainPaciente({ setUsuario, modalIsOpen }) {
    const [file, setFile] = useState('');
    const [imageNome, setImageNome] = useState('');
    const [nomeTexto, setNomeTexto] = useState('');
    const [url, setUrl] = useState('')
    const [observacaoGerada, setObservacaoGerada] = useState('Sem observações');
    const [verificadoTempo, setVerificadorTempo] = useState(false)

    const [image, setImage] = useState(null)
    const [fileName, setFileName] = useState("No selected file")
    const [nomeExame, setNomeExame] = useState("")
    const [informacoesGerado, setInformacoeGerado] = useState([])
    const [tempoEnvio, setTempoEnvio] = useState(false)
    const [tempoEnvioArquivo, setTempoEnvioArquivo] = useState(false)
    const [informacaoUsuario, setIformacaoUsuario] = useState({
        0: 0,
        1: "",
        2: "",
        4: false,
        5: "",
        6: ""
    })
    const [dataExame, setDataExame] = useState('')



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
            const response = await api.get('/obter/usuario', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            if (response.data) {
                console.log("Dados do get:", response.data);
                setIformacaoUsuario(response.data)
                setUsuario(response.data)
            }

            setVerificadorTempo(true)
        } catch (error) {
            toast.error("Não foi possivel obter usuario")
        }
    }

    useEffect(() => {
        obterUsuario()
    }, [modalIsOpen])

    // useEffect(() => {
    //     setTimeout(() => {
    //         setVerificadorTempo(true)
    //     }, 1200)
    // }, [verificadoTempo])



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
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            console.log(response);

            const { filename } = response.data;
            setImageNome(filename);

            toast.success(`Enviado com sucesso!`);
            getTexto()

        } catch (error) {
            toast.error("Error ao enviar a imagem!")
            console.log(error);
        }
    }

    async function getTexto() {
        try {
            const response = await api.get('/getLeitura', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            console.log(response);

            const { nome_exame, url_exame, lista_dados, observacao
            } = response.data;
            setNomeTexto(nome_exame);
            setObservacaoGerada(observacao);
            setInformacoeGerado(lista_dados)
            setUrl(url_exame);
            setTempoEnvioArquivo(true)
            verificaCampo()
        } catch (error) {
            toast.error("Error no servidor!")
            console.log(error);
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
                    'nome_exame': nomeExame,
                    'url_exame': url,
                    'lista_dados': informacoesGerado,
                    'observacao': observacaoGerada,
                    'data_exame': dataExame
                }
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            if (response && response.data) {
                console.log(response.data);
            }
            setTempoEnvio(true)
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data.mensagem) {
                toast.error(error.response.data.mensagem)
            }
        }

    }

    useEffect(() => {
        if (tempoEnvio) {
            setTimeout(() => {
                setTempoEnvio(false)
                toast.success('Enviado com sucesso!')
                setInformacoeGerado()
                setUrl('')
                setNomeTexto('')
                setImage(null)
                setFile(null)
                setNomeExame('')
                setFileName("No selected file")
            }, 3000)
        }
        if (tempoEnvioArquivo) {
            setTimeout(() => {
                setTempoEnvioArquivo(false)
                toast.success(`Gerador texto com sucesso!!`)
            }, 3000)
        }
    }, [tempoEnvio, tempoEnvioArquivo, image])


    console.log("Informacoes :");
    console.log(informacoesGerado);

    return (
        <div className='app-main-paciente'>
            <section className='informacoes-paciente'>
                {!verificadoTempo && (<AnimationsPerfil />)}
                {verificadoTempo && (
                    <>
                        <div className='informacoes-paciente-nome'>
                            <h1>Paciente:</h1>
                            <h2>{informacaoUsuario[1] ? informacaoUsuario[1][0].toUpperCase() + informacaoUsuario[1].slice(1) : "-----"}</h2>
                        </div>
                        <div className='informacoes-paciente-dados'>
                            <ul>
                                <li>CPF:  {informacaoUsuario[5] ? informacaoUsuario[5] ? (informacaoUsuario[5].slice(0, 3) + "." + informacaoUsuario[5].slice(3, 6) + "." + informacaoUsuario[5].slice(6, 9) + "-" + informacaoUsuario[5].slice(9)) : ("") : ""}</li>
                                <li>E-mail:{informacaoUsuario[2]}</li>
                            </ul>
                            <ul>
                                <li>Idade: -- </li>
                                <li>Sexo: -- </li>
                            </ul>
                            <ul>
                                <li>Telefone: {informacaoUsuario[6] ? informacaoUsuario[6] ? ("(" + informacaoUsuario[6].slice(0, 2) + ") " + informacaoUsuario[6].slice(2, 7) + "-" + informacaoUsuario[6].slice(7)) : ("") : ""}</li>
                                <li>Cidade: ------ </li>
                            </ul>
                            <div>
                                <button>
                                    EDITAR
                                    <EditIcon sx={{ color: '#fff', width: '20px', height: '20px' }} />
                                </button>
                            </div>
                        </div>
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
                    {(tempoEnvio || tempoEnvioArquivo) && (
                        <div className='loard-temporizado'>
                            <Loaders />
                        </div>)}
                    {!(tempoEnvio || tempoEnvioArquivo) && (
                        <div className='text-gerado-arquivo-exame'>
                            <div className='form-exame-tiulo'>
                                <aside>
                                    <form className='form-nome-exame'>
                                        <label>Nome do exame : </label>
                                        <input
                                            className='form-nome-exame-input'
                                            placeholder='Hemograma'
                                            maxLength={100}
                                            type='text'
                                            value={nomeExame.slice(0, (fileName.length - 4))}
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
                                    <div className='form-principal'>

                                    </div>
                                    <div className='form-dados'>
                                        {(Array.isArray(informacoesGerado)) && (
                                            <>
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
                                                </section>
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
                                            </>
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
        </div>
    );
}