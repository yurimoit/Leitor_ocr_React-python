import './styles.css'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import api from '../../services/api';
import toast from 'react-hot-toast';

export function ModalEditarExame({ setCloseModalEditar, idDetalharExame, exame, exameNome, exameObs, data, setFinalizarEditarExame }) {

    const [detalhesExame, setDetalhesExame] = useState([
        { 'nome': '--', 'valorPR': '--', 'valoRA': '--', 'valorB': '--', 'unidade': '--' },
        {
            'nome': 'hemoglobina', 'valorPR': '--',
            'valoRA': '--', 'valorB': '--', 'unidade': 'g/dl'
        },
        {
            'nome': 'hematocrito', 'valorPR': '--', 'valoRA': '--',
            'valorB': '--', 'unidade': '%'
        },
        {
            'nome': 'vcm', 'valorPR': '--', 'valoRA': '--',
            'valorB': '--', 'unidade': 'fl'
        },
        {
            'nome': 'hcm', 'valorPR': '--', 'valoRA': '--',
            'valorB': '--', 'unidade': 'pg'
        },
        {
            'nome': 'chcm', 'valorPR': '--', 'valoRA': '--',
            'valorB': '--', 'unidade': 'g/dl'
        },
        {
            'nome': 'rdw', 'valorPR': '--', 'valoRA': '--',
            'valorB': '--', 'unidade': '%'
        },
        {
            'nome': 'leucocitos - global', 'valorPR': '--', 'valoRA': '--',
            'valorB': '--', 'unidade': '/mm³'
        },
        {
            'nome': 'neutrofilos bastonetes', 'valorPR': '--', 'mm3': '--', 'valoRA': '--',
            'valorB': '--', 'unidade': '%'
        },
        {
            'nome': 'neutrofilos segmentados', 'valorPR': '--', 'mm3': '--', 'valoRA': '--',
            'valorB': '--', 'unidade': '%'
        },
        {
            'nome': 'linfocitos', 'valorPR': '--', 'mm3': '--', 'valoRA': '--',
            'valorB': '--', 'unidade': '%'
        },
        {
            'nome': 'monocitos', 'valorPR': '--', 'mm3': '--', 'valoRA': '--',
            'valorB': '--', 'unidade': '%'
        },
        {
            'nome': 'eosinofilos', 'valorPR': '--', 'mm3': '--', 'valoRA': '--',
            'valorB': '--', 'unidade': '%'
        },
        {
            'nome': 'basafilos', 'valorPR': '--', 'mm3': '--', 'valoRA': '--',
            'valorB': '--', 'unidade': '%'
        },
        { 'nome': 'plaquetas', 'valorPR': '--', 'valoRA': '--', 'valorB': '--', 'unidade': '/mm³' }
    ])
    const [id, setId] = useState(null)
    const [nome, setNome] = useState(null)
    const [obs, setObs] = useState(null)
    const [dataExame, setDataExame] = useState('')
    const [textoNota, setTextoNota] = useState('')


    useEffect(() => {
        if (obs) {
            setTextoNota(obs)
        }
    }, [obs])

    function capitalize(palavra) {
        if (palavra) {
            return palavra[0].toUpperCase() + palavra.slice(1).toLowerCase()
        }

        return palavra
    }


    const handleInputChange = (event, index) => {
        const { name, value } = event.target;
        const list = [...detalhesExame];
        let valor = value.replace(',', '.')
        if (!isNaN(valor)) {
            list[index][name] = valor;
            setDetalhesExame(list);
            verificaCampo()
            return
        }

        list[index][name] = value;
        setDetalhesExame(list);
        verificaCampo()
    }


    function clearInput() {
        if (detalhesExame) {
            let lista = [...detalhesExame]
            for (let objeto of lista) {
                for (let chave of Object.keys(objeto)) {
                    if (chave === 'nome' || chave === 'unidade') {
                        continue
                    }
                    objeto[chave] = '--'
                }
            }
            setDetalhesExame(lista)
            verificaCampo()
        }

        if (obs) {
            setObs("")
        }

        if (nome) {
            setNome("")
        }
    }

    function verificaCampo(borda = "red") {
        let verifica = true

        if (detalhesExame) {
            let lista = detalhesExame
            // console.log("Lista da func verifica: ", lista);
            for (let objeto of lista) {
                for (let chave of Object.keys(objeto)) {
                    if (chave === 'nome' || chave === 'unidade') {
                        continue
                    }

                    if (isNaN((objeto[chave])) || objeto[chave] === "") {
                        console.log("Chave func verifica: ", chave);
                        document.getElementById(objeto['nome']).style.color = borda
                        verifica = false
                        break
                    } else {
                        document.getElementById(objeto['nome']).style.color = 'black'
                    }
                }
            }

            if (nome === "") {
                document.getElementById('nome-exame').style.color = 'red'
                verifica = false
            } else {
                document.getElementById('nome-exame').style.color = '#05114c'
            }

            // if (obs === "") {
            //     document.getElementById('textoArea').style.border = '2px solid red'
            //     verifica = false
            // } else {
            //     document.getElementById('textoArea').style.border = 'none'
            // }
        }

        return verifica
    }

    async function sendFormData() {
        verificaCampo()

        if (!verificaCampo()) {
            return toast.error('Todos os campos sao obrigatorios')
        }

        try {
            const response = await api.post(`/atualizar/exame/${id}`, {
                resposta: {
                    'nome_exame': nome,
                    'lista_dados': detalhesExame,
                    'observacao': obs,
                    'data_exame': dataExame
                }
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('E%H6%2&6GB8UU!UZ3XncHd')}`
                }
            })

            if (response && response.data) {
                // console.log(response.data);
                // toast.success(response.data.mensagem)
            }
            setFinalizarEditarExame("success")
            setCloseModalEditar(false)
            // setTempoEnvio(true)
        } catch (error) {
            // console.log(error);
            setFinalizarEditarExame("error")
        }

    }



    useEffect(() => {
        setDetalhesExame(exame)
        setId(idDetalharExame)
        setNome(exameNome)
        setObs(exameObs)
        setDataExame(data)
    }
        , [idDetalharExame, exame, exameNome, exameObs, data])




    // console.log("id", id);
    // console.log("Array Exame", detalhesExame);


    return (
        <div className="modal">
            <Modal
                open={true}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="modal-editar-exame-y"

            >
                <Box >
                    <div className="modal-editar-exame-i">
                        <div className="titulo-editar-exame">
                            <div className="title-editar-exame">
                                <h2>EDITAR EXAME</h2>
                            </div>
                            <button onClick={() => setCloseModalEditar(false)}>
                                <CloseIcon sx={{ width: '100%', height: '28px' }} />
                            </button>
                        </div>
                        <section className="borda-editar-exame" >
                            <section className="formulario-editar-exame-i">
                                <div className='bloco-nome-editar-exame'>
                                    <div className='bloco-nome-editar-exame-nome-div'>
                                        <h2 id='nome-exame'>
                                            Nome exame:
                                        </h2>
                                        <input
                                            type='text'
                                            name='nome_exame'
                                            placeholder='Nome de exane'
                                            value={nome ? capitalize(nome) : ""}
                                            onChange={(e) => setNome(e.target.value)}
                                        />
                                    </div>
                                    <div className='editar-data'>
                                        <h2 id='nome-exame'>
                                            Data :
                                        </h2>
                                        <input
                                            type='date'
                                            placeholder=''
                                            value={dataExame ? dataExame : ""}
                                            onChange={(e) => setDataExame(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {detalhesExame.map((objeto) => (
                                    <div key={objeto.nome} className="bloco1-editar-exame">
                                        <div className='bloco1-valor-editar-exame'>
                                            <p id={objeto.nome}>{capitalize(objeto.nome)}: </p>
                                            <input
                                                type='text'
                                                name='valorPR'
                                                placeholder='valor padrão'
                                                value={objeto.valorPR}
                                                onChange={(e) => handleInputChange(e, detalhesExame.indexOf(objeto))}
                                            />
                                            <span> {objeto.unidade}</span>
                                            <p>{" "}</p>
                                            {Object.keys(objeto).includes('mm3') ? (
                                                <>
                                                    <input
                                                        type='text'
                                                        name='mm3'
                                                        placeholder='valor padrão'
                                                        value={objeto.mm3}
                                                        onChange={(e) => handleInputChange(e, detalhesExame.indexOf(objeto))}
                                                    />
                                                    <span>{" /mm³"}</span>
                                                </>
                                            ) : ""}
                                        </div>
                                        <div id={objeto.nome} className='bloco1-referencia-editar-exame'>
                                            <input
                                                type='text'
                                                name='valoRA'
                                                placeholder='valor padrão'
                                                value={objeto.valoRA}
                                                onChange={(e) => handleInputChange(e, detalhesExame.indexOf(objeto))}
                                            />
                                            <p>Até</p>
                                            <input
                                                type='text'
                                                name='valorB'
                                                placeholder='valor padrão'
                                                value={objeto.valorB}
                                                onChange={(e) => handleInputChange(e, detalhesExame.indexOf(objeto))}
                                            />
                                            <span>{(objeto.unidade === '%') && (objeto.nome !== ('hematocrito') && objeto.nome !== ('rdw')) ? '/mm³' : objeto.unidade}</span>
                                        </div>
                                    </div>
                                ))}

                                <div className='bloco-nome-obs-editar-exame'>
                                    <h2>
                                        Nota:
                                    </h2>
                                    <textarea
                                        id="textoArea"
                                        rows="4"
                                        cols="150"
                                        value={textoNota}
                                        onChange={(e) => setObs(e.target.value)}
                                    >{textoNota ? textoNota : " Sem observações"}</textarea>
                                </div>
                            </section>
                        </section>
                        <div className='form-button-editar-exame'>
                            <button onClick={() => clearInput()} style={{ backgroundColor: '#dbd117', color: 'black' }}>Limpar</button>
                            <button onClick={() => sendFormData()} style={{ backgroundColor: 'green' }}>enviar</button>
                        </div>
                    </div>
                </Box >
            </Modal >
        </div >
    )
}