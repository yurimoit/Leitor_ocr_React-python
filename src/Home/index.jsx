import './styles.css';
import { useEffect, useState } from 'react';
import EditProfile from '../components/editP';
import TuneIcon from '@mui/icons-material/Tune';
import SearchIcon from '@mui/icons-material/Search';
import ModalCadastrarPaciente from '../components/ModalCadastrarPaciente';
import SwapVertIcon from "@mui/icons-material/SwapVert";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Header from '../components/Header';
import MainPaciente from '../components/MainPaciente';
import SideBar from '../components/SideBar';
import { useNavigate } from 'react-router-dom';
import ListaExames from '../components/ListaExames';
import api from '../services/api';
import DashBoard from '../components/DashBoard';
import ResultadoNaoEncontrado from '../components/ResultadoNaoEncontrado';
import Animations from '../components/LoadersAnimatons';
import ModalEditarPaciente from '../components/ModalEditarPaciente';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import ModalDeletarPaciente from '../components/ModalDeletarPaciente';
import toast from 'react-hot-toast';


export default function AppHome({ verificacao, listaExame, Dasboard }) {
    const [statusWindows, setStatusWindows] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [openModalCDPT, setOpenModalCDPT] = useState(false);
    const [openModalEditarPT, setOpenModalEditarPT] = useState(false);
    const [isPage, setIsPage] = useState(true)
    const [isPageHome, setIsPageHome] = useState(false)
    const [isPageExames, setIsPageExames] = useState(false)
    const [isPageDashBoard, setIsPageDashBoard] = useState(false)
    const [finalizarCDPaciente, setFinalizarCDPaciente] = useState('')
    const [finalizarEditarPaciente, setFinalizarEditarPaciente] = useState('')
    const [finalizarExcluirPaciente, setFinalizarExcluirPaciente] = useState('')
    const [arrayPacientes, setArrayPacientes] = useState([])
    const [idPaciente, setIdPaciente] = useState(null)
    const [dadosPaciente, setDadosPaciente] = useState([])
    const [closeModalDeletarPaciente, setCloseModalDeletarPaciente] = useState(false)
    const [isVerificacao, setIsVerificacao] = useState(false)
    const [resultadoNaoEncontrado, setResultadoNaoEncontrado] = useState(false)
    const navigate = useNavigate()
    const [usuario, setUsuario] = useState({
        0: 0,
        1: "",
        2: "",
        4: false,
        5: "",
        6: ""
    })



    async function filtraPacientes(pesquisa2) {
        try {
            if (Boolean(localStorage.getItem('BcD#p%swmmE6e%dR9UJK^kqBi@JMtf27'))) {
                const response = await api.get(`/buscarFiltro/pacientes?busca=${pesquisa2}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('E%H6%2&6GB8UU!UZ3XncHd')}`
                    }
                })

                if (response.data) {
                    setResultadoNaoEncontrado(false)
                    // console.log(response.data)
                    setArrayPacientes(response.data)

                }
            }
        } catch (error) {
            setResultadoNaoEncontrado(true)
            // console.log(error);
        }
    }


    useEffect(() => {
        if (!localStorage.getItem('BcD#p%swmmE6e%dR9UJK^kqBi@JMtf27')) {
            setIsVerificacao(true)
        }

        if (verificacao) {
            setIsVerificacao(true)
        }

        if (listaExame) {
            setIsPage(false)
            setIsPageHome(false)
            setIsPageExames(true)
            setIsPageDashBoard(false)
        }

        if (Dasboard) {
            setIsPage(false)
            setIsPageHome(false)
            setIsPageExames(false)
            setIsPageDashBoard(true)
        }

    }, [isVerificacao, verificacao, listaExame, Dasboard])


    async function obterUsuario() {
        try {

            const response = await api.get('/obter/usuario', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('E%H6%2&6GB8UU!UZ3XncHd')}`
                }
            })

            if (response.data) {
                // console.log("Dados do get:", response.data);
                setUsuario(response.data)
            }


        } catch (error) {
            toast.error("Não foi possivel obter usuario")
        }
    }


    async function buscarPacientes() {

        if (!Boolean(localStorage.getItem('BcD#p%swmmE6e%dR9UJK^kqBi@JMtf27'))) {
            return
        }

        try {
            const response = await api.get('/buscar/pacientes',
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('E%H6%2&6GB8UU!UZ3XncHd')}`
                    }
                }
            )

            if (response) {
                setArrayPacientes(response.data)
            }
        } catch (error) {
            toast.error("Não foi possivel obter pacientes")
            return
            // console.log(error);
        }
    }

    useEffect(() => {
        obterUsuario()
    }, [modalIsOpen])


    useEffect(() => {
        buscarPacientes()
    }, [openModalEditarPT, openModalCDPT, closeModalDeletarPaciente, isPage])


    function openModalDetalhar(id) {
        setIsVerificacao(true)
        setIsPage(true)
        setIsPageHome(false)
        setIdPaciente(id)
        localStorage.setItem('SMoYgVd$Q6Qf2#g@fG5XTgH', id)
        navigate('/home/cadastro')
    }

    function openModalEditarPaciente(id, paciente) {
        setOpenModalEditarPT(true)
        setIdPaciente(id)
        setDadosPaciente(paciente)
    }

    function openModalExcluirPaciente(id) {
        setCloseModalDeletarPaciente(true)
        setIdPaciente(id)
    }


    useEffect(() => {
        if (finalizarCDPaciente) {
            setTimeout(() => {
                setFinalizarCDPaciente("")
            }, 2500)
        }
    }, [finalizarCDPaciente])

    useEffect(() => {
        if (finalizarEditarPaciente) {
            setTimeout(() => {
                setFinalizarEditarPaciente("")
            }, 2500)
        }
    }, [finalizarEditarPaciente])

    useEffect(() => {
        if (finalizarExcluirPaciente) {
            setTimeout(() => {
                setFinalizarExcluirPaciente("")
            }, 2500)
        }
    }, [finalizarExcluirPaciente])

    return (
        <div className='app-home'>
            <Header
                statusWindows={statusWindows}
                setStatusWindows={setStatusWindows}
                modalIsOpen={modalIsOpen}
                setIsOpen={setIsOpen}
                usuario={usuario}
            />

            <EditProfile
                modalIsOpen={modalIsOpen}
                setIsOpen={setIsOpen}
                usuario={usuario}
            />

            <ModalCadastrarPaciente
                openModalCDPT={openModalCDPT}
                setOpenModalCDPT={setOpenModalCDPT}
                setFinalizarCDPaciente={setFinalizarCDPaciente}
            />

            <ModalEditarPaciente
                openModalEditarPT={openModalEditarPT}
                setOpenModalEditarPT={setOpenModalEditarPT}
                idPaciente={idPaciente}
                dadosPaciente={dadosPaciente}
                setFinalizarEditarPaciente={setFinalizarEditarPaciente}
            />

            <ModalDeletarPaciente
                closeModalDeletarPaciente={closeModalDeletarPaciente}
                setCloseModalDeletarPaciente={setCloseModalDeletarPaciente}
                idPaciente={idPaciente}
                setFinalizarExcluirPaciente={setFinalizarExcluirPaciente}
            />

            {isVerificacao ? (
                <div className='detalhes-paciente-sidebar'>
                    <SideBar
                        setIsVerificacao={setIsVerificacao}
                        isPage={isPage}
                        setIsPage={setIsPage}
                        isPageHome={isPageHome}
                        setIsPageHome={setIsPageHome}
                        isPageExames={isPageExames}
                        setIsPageExames={setIsPageExames}
                        isPageDashBoard={isPageDashBoard}
                        setIsPageDashBoard={setIsPageDashBoard}
                    />
                    {isPageExames && (<ListaExames
                        idPaciente={idPaciente}
                    />)}
                    {isPage && (<MainPaciente
                        setUsuario={setUsuario}
                        modalIsOpen={modalIsOpen}
                        idPaciente={idPaciente}
                    />)}
                    {isPageDashBoard && (
                        <DashBoard
                            isPageDashBoard={isPageDashBoard}
                        />
                    )}

                </div>
            ) : (
                <main>
                    <nav className='nav-main-lista-exames-paciente'>
                        <div className='title-lista-exames-pacientes-principal'>
                            <h1 id='title-lista-exames--pacientes-principal-h1'>LISTA DE PACIENTES</h1>
                        </div>
                        <div className='nav-add-paciente-lista-exames-paciente'>
                            <button onClick={() => setOpenModalCDPT(true)} className='button-adicionar-paciente'>
                                + Adicionar paciente
                            </button>
                            <button className='button-add-filter-lista-exames-pacientes' >
                                <TuneIcon sx={{ width: '90%', height: '95%', color: '#fff' }} />
                            </button>
                            <div className='nav-paciente-input-lista-exames-pacientes'>
                                <input
                                    className='buscar-exames-pacientes'
                                    type="text"
                                    maxlength="33"
                                    placeholder='Pesquisa exame: ID, Nome, E-mail, CPF e Telefone'
                                    onChange={(e) => filtraPacientes(e.target.value)}
                                />
                                <button onClick={() => filtraPacientes("")} className='button-search'>
                                    <SearchIcon sx={{ width: '100%', height: '100%', color: 'black' }} />
                                </button>
                            </div>
                        </div>
                    </nav>
                    <section className='section-main-lista-exames-paciente'>
                        {true && (
                            <>
                                <div className='cabecalho-tabela-lista-exames-pacientes'>
                                    <div className='cabecalho-tabela-div-id'>
                                        <SwapVertIcon sx={{ width: '3rem', height: '60%', color: '#fff' }} />
                                        <h1 className='cabecalho-tabela-div-h1'>ID</h1>
                                    </div>
                                    <div className='cabecalho-tabela-div-nome'>
                                        <SwapVertIcon sx={{ width: '3rem', height: '60%', color: '#fff' }} />
                                        <h1 className='cabecalho-tabela-div-h1'>Nome</h1>
                                    </div>
                                    <div className='cabecalho-tabela-div-status'>
                                        <SwapVertIcon sx={{ width: '3rem', height: '60%', color: '#fff' }} />
                                        <h1 className='cabecalho-tabela-div-h1'>CPF</h1>
                                    </div>
                                    <div className='cabecalho-tabela-div-status'>
                                        <SwapVertIcon sx={{ width: '3rem', height: '60%', color: '#fff' }} />
                                        <h1 className='cabecalho-tabela-div-h1'>Telefone</h1>
                                    </div>
                                    <div className='cabecalho-tabela-div-op'>
                                        <SwapVertIcon sx={{ width: '3rem', height: '60%', color: '#fff' }} />
                                        <h1 className='cabecalho-tabela-div-h1'>Opções</h1>
                                    </div>

                                </div>
                                {resultadoNaoEncontrado && (<ResultadoNaoEncontrado />)}
                                {!resultadoNaoEncontrado && (
                                    <div className='tabela-lista-exames-usuario'>
                                        {false && (< Animations />)}
                                        {true && arrayPacientes.map((item) => (
                                            <ul key={item['id']}>
                                                <li className='li-detalhar-paciente-lista-exames-usuario' onClick={() => openModalDetalhar(item['id'], item)}>{item['id']}</li>
                                                <li className='li-nome-paciente-lista-exames-usuario'>{item['nome']}</li>
                                                <li className='li-staus-paciente-lista-exames-usuario' >{item['cpf'] ? item['cpf'] ? (item['cpf'].slice(0, 3) + "." + item['cpf'].slice(3, 6) + "." + item['cpf'].slice(6, 9) + "-" + item['cpf'].slice(9)) : ("") : ""}</li>
                                                <li className='li-staus-paciente-lista-exames-usuario' >{item['telefone'] ? item['telefone'] ? ("(" + item['telefone'].slice(0, 2) + ") " + item['telefone'].slice(2, 7) + "-" + item['telefone'].slice(7)) : ("") : ""}</li>
                                                <li className='li-button-opcoes-lista-exames-usuario'>
                                                    <button onClick={() => openModalEditarPaciente(item['id'], item)} className='button-opcoes-lista-exames-usuario'>
                                                        <ModeEditIcon sx={{ width: '40%', height: '70%', color: 'green' }} />
                                                    </button>
                                                    <button onClick={() => openModalExcluirPaciente(item['id'])} className='button-opcoes-lista-exames-usuario'>
                                                        <DeleteForeverIcon sx={{ width: '40%', height: '70%', color: 'red' }} />
                                                    </button>
                                                </li>
                                            </ul>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </section>

                    {finalizarCDPaciente && (
                        <div className="alert-CB">
                            <Stack sx={{
                                width: '21%',
                                boxShadow: `1px 1px 5px black `,
                                borderRadius: "10px",
                                border: "none"
                            }} spacing={2}>
                                <Alert variant="filled" severity={finalizarCDPaciente} sx={{
                                    width: "100%",
                                    height: "100%",
                                    fontSize: "1.8rem",
                                    fontFamily: "Nunito sans-serif",
                                    display: "flex",
                                    alignItems: "center",
                                    border: "none"
                                }}>
                                    {finalizarCDPaciente === 'success' ? 'Cadastrado com sucesso!' : "Erro no cadastro!"}
                                </Alert>
                            </Stack>
                        </div>
                    )}

                    {finalizarEditarPaciente && (
                        <div className="alert-CB">
                            <Stack sx={{
                                width: '21%',
                                boxShadow: `1px 1px 5px black `,
                                borderRadius: "10px",
                                border: "none"
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

                    {finalizarExcluirPaciente && (
                        <div className="alert-CB">
                            <Stack sx={{
                                width: '21%',
                                boxShadow: `1px 1px 5px black `,
                                borderRadius: "10px",
                                border: "none"
                            }} spacing={2}>
                                <Alert variant="filled" severity={finalizarExcluirPaciente} sx={{
                                    width: "100%",
                                    height: "100%",
                                    fontSize: "1.8rem",
                                    fontFamily: "Nunito sans-serif",
                                    display: "flex",
                                    alignItems: "center",
                                    border: "none"
                                }}>
                                    {finalizarExcluirPaciente === 'success' ? 'Exclusão concluida com sucesso!' : "Erro na exclusão!"}
                                </Alert>
                            </Stack>
                        </div>
                    )}

                </main>
            )}
        </div>
    );
}