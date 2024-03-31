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

export default function ListaExames() {

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


    const arrayTeste = [
        {
            id: '12343',
            nome: 'Hemograma',
            status: 'Pendente',
        },
        {
            id: '12993',
            nome: 'Hemograma',
            status: 'Pendente',
        },
        {
            id: '89943',
            nome: 'Hemograma-completo',
            status: 'Concluido',
        }
    ]
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
            const response = await api.get(`/buscar/exames?busca=${pesquisa2}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            if (response.data) {
                console.log(response.data);
                setResultadoNaoEncontrado(false);
                setArrayGerado([...response.data])
            }
        } catch (error) {
            setResultadoNaoEncontrado(true);
            console.log(error);
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

    console.log("Data----------:", formataData(data));


    async function getBanco() {
        try {
            const response = await api.get('/getBanco', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })


            if (response && response.data) {
                console.log(response.data);
                setArrayGerado([...response.data])
            }

            setVerificadorTempo(true)
            return 'foi'
        } catch (error) {
            console.log(error);
        }
    }

    console.log("ArrayGerado: ", arrayGerado);

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
    }, [closeModalDetalhar, closeModalEditar, idDetalharExame, closeModalDeletar])



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
                            placeholder='Pesquisa exame'
                            onChange={(e) => filtraExames(e.target.value)}
                        />
                        <button onClick={() => filtraExames("")} className='button-search'>
                            <SearchIcon sx={{ width: '100%', height: '100%', color: 'black' }} />
                        </button>
                    </div>
                </div>
            </nav>
            <section className='section-main-lista-exames-usuario'>
                {resultadoNaoEncontrado && (<ResultadoNaoEncontrado />)}
                {!resultadoNaoEncontrado && (
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
                        <div className='tabela-lista-exames-usuario'>
                            {!verificadoTempo && (< Animations />)}
                            {verificadoTempo && arrayGerado.map((item) => (
                                <ul key={item.id}>
                                    <li onClick={() => abrirModal(item.id, item.lista_dados, item.nome_exame, item.observacao, item.data_exame)} className='li-detalhar-paciente-lista-exames-usuario'  /*onClick={() =>openModalDetalhar()}*/>{item.id}</li>
                                    <li className='li-nome-paciente-lista-exames-usuario'>{item.nome_exame}</li>
                                    <li className='li-staus-paciente-lista-exames-usuario' >{formataData(item.data_exame) ? `${formataData(item.data_exame).slice(8)}/${formataData(item.data_exame).slice(5, 7)}/${formataData(item.data_exame).slice(0, 4)}` : 'Sem data'}</li>
                                    <li className='li-button-opcoes-lista-exames-usuario'>
                                        <button onClick={() => abrirModalEditar(item.id, item.lista_dados, item.nome_exame, item.observacao, item.data_exame)} className='button-opcoes-lista-exames-usuario'>
                                            <ModeEditIcon sx={{ color: 'green' }} />
                                        </button>
                                        <button onClick={() => abrirModalDeletar(item.id)} className='button-opcoes-lista-exames-usuario'>
                                            <DeleteForeverIcon sx={{ color: 'red' }} />
                                        </button>
                                    </li>
                                </ul>
                            ))}
                        </div>
                    </>
                )}
            </section>

            {finalizarEditarExame && (
                <div className="alert-CB">
                    <Stack sx={{ width: '21%', boxShadow: `0px 4px 42px 0px #00000033 `, borderRadius: "10px" }} spacing={2}>
                        <Alert variant="filled" severity={finalizarEditarExame}>
                            {finalizarEditarExame === 'success' ? 'Atualização concluida com sucesso!' : "Erro na atualização!"}
                        </Alert>
                    </Stack>
                </div>
            )}

            {finalizarDeletarExame && (
                <div className="alert-CB">
                    <Stack sx={{ width: '21%', boxShadow: `0px 4px 42px 0px #00000033 `, borderRadius: "10px" }} spacing={2}>
                        <Alert variant="filled" severity={finalizarDeletarExame}>
                            {finalizarDeletarExame === 'success' ? 'Excluiu com sucesso!' : "Erro na exclusão!"}
                        </Alert>
                    </Stack>
                </div>
            )}

        </main>
    )
}