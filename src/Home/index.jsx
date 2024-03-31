import './styles.css';
import { useState } from 'react';
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
import ChartComponent from '../components/grafico';


export default function AppHome() {
    const [statusWindows, setStatusWindows] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [openModalCDPT, setOpenModalCDPT] = useState(false);
    const [openDetalharPaciente, setOpenDetalharPaciente] = useState(false)
    const [isPage, setIsPage] = useState(true)
    const [isPageHome, setIsPageHome] = useState(false)
    const [isPageExames, setIsPageExames] = useState(false)
    const [isPageDashBoard, setIsPageDashBoard] = useState(false)
    const [usuario, setUsuario] = useState({
        0: 0,
        1: "",
        2: "",
        4: false,
        5: "",
        6: ""
    })
    const navigate = useNavigate()


    const arrayTeste = [
        {
            id: '12343',
            nome: 'yuri',
            cpf: '09378289766',
            status: 'Pendente',
        },
        {
            id: '12993',
            nome: 'Rogerio',
            cpf: '09352489766',
            status: 'Pendente',
        },
        {
            id: '89943',
            nome: 'Mario',
            cpf: '09399289766',
            status: 'Concluido',
        }
    ]


    function openModalDetalhar() {
        setOpenDetalharPaciente(true)
        navigate('/home/cadastro')
    }

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
            />

            <ModalCadastrarPaciente
                openModalCDPT={openModalCDPT}
                setOpenModalCDPT={setOpenModalCDPT}
            />

            {openDetalharPaciente ? (
                <div className='detalhes-paciente-sidebar'>
                    <SideBar
                        setOpenDetalharPaciente={setOpenDetalharPaciente}
                        isPage={isPage}
                        setIsPage={setIsPage}
                        isPageHome={isPageHome}
                        setIsPageHome={setIsPageHome}
                        isPageExames={isPageExames}
                        setIsPageExames={setIsPageExames}
                        isPageDashBoard={isPageDashBoard}
                        setIsPageDashBoard={setIsPageDashBoard}
                    />
                    {isPageExames && (<ListaExames />)}
                    {isPage && (<MainPaciente
                        setUsuario={setUsuario}
                        modalIsOpen={modalIsOpen}
                    />)}
                    {isPageDashBoard && (<ChartComponent />)}
                </div>
            ) : (
                <main>
                    <nav className='nav-main'>
                        <div className='nav-title'>
                            <h1>Lista de pacientes</h1>
                        </div>
                        <div className='nav-add-paciente'>
                            <button onClick={() => setOpenModalCDPT(true)} className='button-add-paciente'>+ adicionar paciente</button>
                            <button className='button-add-filter' >
                                <TuneIcon sx={{ width: '90%', height: '97%', color: '#da0175' }} />
                            </button>
                            <div className='nav-paciente-input'>
                                <input
                                    type="text"
                                    maxlength="33"
                                    placeholder='Pesquisa paciente'
                                />
                                <SearchIcon sx={{ marginLeft: '-12%' }} />
                            </div>
                        </div>
                    </nav>
                    <section className='section-main'>
                        <div className='cabecalho-tabela'>
                            <div>
                                <SwapVertIcon />
                                <h1>ID</h1>
                            </div>
                            <div>
                                <SwapVertIcon />
                                <h1>Nome</h1>
                            </div>
                            <div>
                                <SwapVertIcon />
                                <h1>CPF</h1>
                            </div>
                            <div>
                                <SwapVertIcon />
                                <h1>Status</h1>
                            </div>
                            <div>
                                <SwapVertIcon />
                                <h1>Opções</h1>
                            </div>

                        </div>
                        <div className='tabela'>
                            {arrayTeste.map((item) => (
                                <ul>
                                    <li className='li-detalhar-paciente' onClick={() => openModalDetalhar()}>{item.id}</li>
                                    <li className='li-nome-paciente'>{item.nome}</li>
                                    <li>{item.cpf}</li>
                                    <li>{item.status}</li>
                                    <li className='li-button-opcoes'>
                                        <button style={{ backgroundColor: "green" }} className='button-opcoes'>
                                            <ModeEditIcon sx={{ color: '#fff' }} />
                                        </button>
                                        <button style={{ backgroundColor: "red" }} className='button-opcoes'>
                                            <DeleteForeverIcon sx={{ color: '#fff' }} />
                                        </button>
                                    </li>
                                </ul>
                            ))}
                        </div>
                    </section>
                </main>
            )}
        </div>
    );
}