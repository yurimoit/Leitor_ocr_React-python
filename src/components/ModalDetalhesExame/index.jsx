import './styles.css'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

export function ModalDetalhesExame({ setCloseModalDetalhar, idDetalharExame, exame, exameNome, exameObs, data }) {

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
    const [
        // eslint-disable-next-line
        id, setId] = useState(null)
    const [nome, setNome] = useState(null)
    const [obs, setObs] = useState(null)
    const [dataExame, setDataExame] = useState('')

    function capitalize(palavra) {
        if (palavra) {
            return palavra[0].toUpperCase() + palavra.slice(1).toLowerCase()
        }

        return palavra
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
                className="modal-detalhar-cobranca-y"

            >
                <Box >
                    <div className="modal-detalhar-cobranca-i">
                        <div className="titulo-detalhamento-exame">
                            <div className="title">
                                <h2>Detalhes do exame</h2>
                            </div>
                            <button onClick={() => setCloseModalDetalhar(false)}>
                                <CloseIcon sx={{ width: '100%', height: '28px' }} />
                            </button>
                        </div>
                        <section className="borda" >
                            <section className="formulario-detalhes-i">
                                <div className='bloco-nome-exame'>
                                    <h2>
                                        Nome exame: {nome ? capitalize(nome) : ""}
                                    </h2>
                                    <h2>
                                        Data: {dataExame ? `${dataExame.slice(8)}/${dataExame.slice(5, 7)}/${dataExame.slice(0, 4)}` : 'Sem data'}
                                    </h2>
                                </div>

                                {detalhesExame.map((objeto) => (
                                    <div key={objeto.nome} className="bloco1">
                                        <div className='bloco1-valor'>
                                            <p>{capitalize(objeto.nome)}: </p>
                                            <p>{objeto.valorPR} </p>
                                            <span> {objeto.unidade}</span>
                                            <p>{" "}</p>
                                            <p>{objeto.mm3 ? <p> {objeto.mm3}<span>{" /mm³"}</span></p> : ""}</p>
                                        </div>
                                        <div className='bloco1-referencia'>
                                            <p>{objeto.valoRA}</p>
                                            <p>A</p>
                                            <p>{objeto.valorB}</p>
                                            <span>{!objeto.mm3 ? < p > {objeto.mm3} < span > {" /mm³"}</span></p> : ""}</span>
                                        </div>
                                    </div>
                                ))}

                                <div className='bloco-nome-obs'>
                                    <h2>
                                        Nota:
                                    </h2>
                                    <textarea
                                        id="textoArea"
                                        rows="4"
                                        cols="150"
                                        value={obs}
                                    // onChange={(e) => setObs(e.target.value)}
                                    >{obs ? obs : " Sem observações"}</textarea>
                                    {/* <p > {obs ? obs : " Sem observações"}</p> */}
                                </div>
                            </section>
                        </section>
                    </div>
                </Box >
            </Modal >
        </div >
    )
}