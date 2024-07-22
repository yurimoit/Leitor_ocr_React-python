import './styles.css'
import TuneIcon from '@mui/icons-material/Tune';
import SearchIcon from '@mui/icons-material/Search';
import SwapVertIcon from "@mui/icons-material/SwapVert";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import api from '../../services/api'
import { useEffect, useState } from 'react';
import { ModalDetalhesExame } from '../ModalDetalhesExame';
import Animations from '../LoadersAnimatons';
import { ModalEditarExame } from '../ModalEditarExame';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import ModalDeletarExame from '../ModalDeletarExame';
import ResultadoNaoEncontrado from '../ResultadoNaoEncontrado';

export default function ListaExames({ idPaciente }) {

    const [closeModalDetalhar, setCloseModalDetalhar] = useState(false)
    const [closeModalEditar, setCloseModalEditar] = useState(false)
    const [idDetalharExame, setIdDetalharExame] = useState(null)
    const [exame, setExame] = useState([])
    const [exameNome, setExameNome] = useState('')
    const [exameObs, setExameObs] = useState('')
    const [verificadoTempo, setVerificadorTempo] = useState(false)
    const [finalizarEditarExame, setFinalizarEditarExame] = useState("");
    const [closeModalDeletar, setCloseModalDeletar] = useState(false)
    const [finalizarDeletarExame, setFinalizarDeletarExame] = useState("");
    const [data, setData] = useState('')
    const [resultadoNaoEncontrado, setResultadoNaoEncontrado] = useState(false)
    const [isPaciente, setIsPaciente] = useState(null)

    useEffect(() => {
        if (idPaciente) {
            setIsPaciente(idPaciente)
        }
    }, [idPaciente])




    function formataData(dateString) {

        dateString = String(dateString)
        const date = new Date(dateString);
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }


    const [arrayGerado, setArrayGerado] = useState([{
        id: 0,
        lista_dados: [],
        nome_exame: "",
        observacao: "",
        url_exame: "",
        data_exame: ''
    }])

    async function filtraExames(pesquisa2) {
        try {
            if (!Boolean(localStorage.getItem('BcD#p%swmmE6e%dR9UJK^kqBi@JMtf27'))) {
                const response = await api.get(`/buscar/exames?busca=${pesquisa2}&id=${null}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('E%H6%2&6GB8UU!UZ3XncHd')}`
                    }
                })

                if (response.data) {
                    // console.log(response.data);
                    setResultadoNaoEncontrado(false);
                    setArrayGerado([...response.data])
                }
            } else if (localStorage.getItem('SMoYgVd$Q6Qf2#g@fG5XTgH')) {
                const response = await api.get(`/buscar/exames?busca=${pesquisa2}&id=${localStorage.getItem('SMoYgVd$Q6Qf2#g@fG5XTgH')}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('E%H6%2&6GB8UU!UZ3XncHd')}`
                    }
                })

                if (response.data) {
                    // console.log(response.data);
                    setResultadoNaoEncontrado(false);
                    setArrayGerado([...response.data])
                }
            }
        } catch (error) {
            setResultadoNaoEncontrado(true);
            // console.log(error);
        }
    }



    function abrirModal(id, exame, nome, obs, data) {
        setCloseModalDetalhar(true)
        setIdDetalharExame(id)
        setExame(exame)
        setExameNome(nome)
        setExameObs(obs)
        setData(formataData(data))
    }

    function abrirModalEditar(id, exame, nome, obs, data) {
        setCloseModalEditar(true)
        setIdDetalharExame(id)
        setExame(exame)
        setExameNome(nome)
        setExameObs(obs)
        setData(formataData(data))
    }

    function abrirModalDeletar(id) {
        setCloseModalDeletar(true)
        setIdDetalharExame(id)

    }



    async function getBanco() {
        try {
            if (!Boolean(localStorage.getItem('BcD#p%swmmE6e%dR9UJK^kqBi@JMtf27'))) {
                const response = await api.get(`/getBanco?id=${null}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('E%H6%2&6GB8UU!UZ3XncHd')}`
                    }
                })


                if (response && response.data) {
                    // console.log(response.data);
                    setArrayGerado([...response.data])
                }

                setVerificadorTempo(true)
            } else if (localStorage.getItem('SMoYgVd$Q6Qf2#g@fG5XTgH')) {
                const response = await api.get(`/getBanco?id=${localStorage.getItem('SMoYgVd$Q6Qf2#g@fG5XTgH')}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('E%H6%2&6GB8UU!UZ3XncHd')}`
                    }
                })


                if (response && response.data) {
                    // console.log(response.data);
                    setArrayGerado([...response.data])
                }

                setVerificadorTempo(true)
            }
            return 'foi'
        } catch (error) {
            console.log(error);
        }
    }

    // console.log("ArrayGerado: ", arrayGerado);

    useEffect(() => {
        if (finalizarEditarExame) {
            setTimeout(() => {
                setFinalizarEditarExame("")
            }, 2500)
        }
    }, [finalizarEditarExame])

    useEffect(() => {
        if (finalizarDeletarExame) {
            setTimeout(() => {
                setFinalizarDeletarExame("")
            }, 2500)
        }
    }, [finalizarDeletarExame])


    useEffect(() => {
        getBanco()
    },
        // eslint-disable-next-line 
        [closeModalDetalhar, closeModalEditar, idDetalharExame, closeModalDeletar, isPaciente])



    return (
        <main className='lista-exames-usuario'>
            {closeModalDetalhar && (<ModalDetalhesExame
                setCloseModalDetalhar={setCloseModalDetalhar}
                idDetalharExame={idDetalharExame}
                exame={exame}
                exameNome={exameNome}
                exameObs={exameObs}
                data={data}
            />)}
            {closeModalEditar && (<ModalEditarExame
                setCloseModalEditar={setCloseModalEditar}
                idDetalharExame={idDetalharExame}
                exame={exame}
                exameNome={exameNome}
                exameObs={exameObs}
                data={data}
                setFinalizarEditarExame={setFinalizarEditarExame}
            />)}

            {closeModalDeletar && <ModalDeletarExame
                closeModalDeletar={closeModalDeletar}
                setCloseModalDeletar={setCloseModalDeletar}
                idDetalharExame={idDetalharExame}
                setFinalizarDeletarExame={setFinalizarDeletarExame}
            />}

            <nav className='nav-main-lista-exames-usuario'>
                <div className='title-lista-exames-1'>
                    <h1 id='title-lista-exames-1-h1'>LISTA DE EXAMES</h1>
                </div>
                <div className='nav-add-paciente-lista-exames-usuario'>
                    <button className='button-add-filter-lista-exames-usuario' >
                        <TuneIcon sx={{ width: '90%', height: '97%', color: '#1a17ba' }} />
                    </button>
                    <div className='nav-paciente-input-lista-exames-usuario'>
                        <input
                            className='buscar-exames'
                            type="text"
                            maxlength="33"
                            placeholder='Pesquisa exame: ID, Nome, Data (2024-00-00)'
                            onChange={(e) => filtraExames(e.target.value)}
                        />
                        <button onClick={() => filtraExames("")} className='button-search'>
                            <SearchIcon sx={{ width: '100%', height: '100%', color: 'black' }} />
                        </button>
                    </div>
                </div>
            </nav>
            <section className='section-main-lista-exames-usuario'>
                {true && (
                    <>
                        <div className='cabecalho-tabela-lista-exames-usuario'>
                            <div className='cabecalho-tabela-div-id'>
                                <SwapVertIcon sx={{ color: '#fff' }} />
                                <h1 className='cabecalho-tabela-div-h1'>ID</h1>
                            </div>
                            <div className='cabecalho-tabela-div-nome'>
                                <SwapVertIcon sx={{ color: '#fff' }} />
                                <h1 className='cabecalho-tabela-div-h1'>Nome</h1>
                            </div>
                            <div className='cabecalho-tabela-div-status'>
                                <SwapVertIcon sx={{ color: '#fff' }} />
                                <h1 className='cabecalho-tabela-div-h1'>Data</h1>
                            </div>
                            <div className='cabecalho-tabela-div-op'>
                                <SwapVertIcon sx={{ color: '#fff' }} />
                                <h1 className='cabecalho-tabela-div-h1'>Opções</h1>
                            </div>

                        </div>
                        {resultadoNaoEncontrado && (<ResultadoNaoEncontrado />)}
                        {!resultadoNaoEncontrado && (
                            <div className='tabela-lista-exames-usuario'>
                                {!verificadoTempo && (< Animations />)}
                                {verificadoTempo && arrayGerado.map((item) => (
                                    <ul key={item.id}>
                                        <li onClick={() => abrirModal(item.id, item.lista_dados, item.nome_exame, item.observacao, item.data_exame)} className='li-detalhar-paciente-lista-exames-usuario'  /*onClick={() =>openModalDetalhar()}*/>{item.id}</li>
                                        <li className='li-nome-paciente-lista-exames-usuario'>{item.nome_exame}</li>
                                        <li className='li-staus-paciente-lista-exames-usuario' >{formataData(item.data_exame) ? `${formataData(item.data_exame).slice(8)}/${formataData(item.data_exame).slice(5, 7)}/${formataData(item.data_exame).slice(0, 4)}` : 'Sem data'}</li>
                                        <li className='li-button-opcoes-lista-exames-usuario'>
                                            <button onClick={() => abrirModalEditar(item.id, item.lista_dados, item.nome_exame, item.observacao, item.data_exame)} className='button-opcoes-lista-exames-usuario'>
                                                <ModeEditIcon sx={{ width: '30%', height: "40%", color: 'green' }} />
                                            </button>
                                            <button onClick={() => abrirModalDeletar(item.id)} className='button-opcoes-lista-exames-usuario'>
                                                <DeleteForeverIcon sx={{ width: '30%', height: "40%", color: 'red' }} />
                                            </button>
                                        </li>
                                    </ul>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </section>

            {finalizarEditarExame && (
                <div className="alert-CB">
                    <Stack  spacing={2}
                     sx={{
                        width: '21%',
                        boxShadow: `3px 3px 5px black `,
                        borderRadius: "10px",
                        border: "none",
                        opacity:'0.95'
                    }}
                    >
                        <Alert variant="filled" severity={finalizarEditarExame}
                         sx={{
                            width: "100%",
                            height: "100%",
                            fontSize: "1.8rem",
                            fontFamily: "Nunito sans-serif",
                            display: "flex",
                            alignItems: "center",
                            border: "none"
                        }}
                        >
                            {finalizarEditarExame === 'success' ? 'Atualização concluida com sucesso!' : "Erro na atualização!"}
                        </Alert>
                    </Stack>
                </div>
            )}

            {finalizarDeletarExame && (
                <div className="alert-CB">
                    <Stack spacing={2} 
                     sx={{
                        width: '21%',
                        boxShadow: `3px 3px 5px black `,
                        borderRadius: "10px",
                        border: "none",
                        opacity:'0.95'
                    }}
                    >
                        <Alert variant="filled" severity={finalizarDeletarExame} 
                        sx={{
                            width: "100%",
                            height: "100%",
                            fontSize: "1.8rem",
                            fontFamily: "Nunito sans-serif",
                            display: "flex",
                            alignItems: "center",
                            border: "none"
                        }}
                        >
                            {finalizarDeletarExame === 'success' ? 'Excluiu com sucesso!' : "Erro na exclusão!"}
                        </Alert>
                    </Stack>
                </div>
            )}

        </main>
    )
}