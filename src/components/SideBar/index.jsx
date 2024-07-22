import './styles.css'
import HomeIcon from '@mui/icons-material/Home';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import PolylineIcon from '@mui/icons-material/Polyline';
import { useNavigate } from 'react-router-dom';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { useState } from 'react';


export default function SideBar({
    setIsVerificacao,
    isPage,
    setIsPage,
    isPageHome,
    setIsPageHome,
    isPageExames,
    setIsPageExames,
    isPageDashBoard,
    setIsPageDashBoard,
    modalIsOpenRelatorio,
    setModalIsOpenRelatorio,
}) {

    const navigate = useNavigate()
    const[isRelatorio, setIsRelatorio]=useState(false)

    function selectButton(n) {
        if (n === 1) {
            navigate('/home')
            setIsVerificacao(false)
            setIsPage(false)
            setIsPageHome(true)
            setIsPageExames(false)
            setIsPageDashBoard(false)
            setIsRelatorio(false)
            setModalIsOpenRelatorio(false)
        }
        if (n === 2) {
            setIsPage(true)
            setIsPageHome(false)
            setIsPageExames(false)
            setIsPageDashBoard(false)
            setIsRelatorio(false)
            setModalIsOpenRelatorio(false)
            navigate('/home/cadastro')
            if (localStorage.getItem('BcD#p%swmmE6e%dR9UJK^kqBi@JMtf27')) {
                navigate('/home/cadastro')
            } else {
                navigate('/home/usuario')
            }
        }
        if (n === 3) {
            setIsPage(false)
            setIsPageHome(false)
            setIsPageExames(true)
            setIsPageDashBoard(false)
            setIsRelatorio(false)
            setModalIsOpenRelatorio(false)
            if (localStorage.getItem('BcD#p%swmmE6e%dR9UJK^kqBi@JMtf27')) {
                navigate('/home/listaExame')
            } else {
                navigate('/home/usuario/listaExame')
            }
        }
        if (n === 4) {
            setIsPage(false)
            setIsPageHome(false)
            setIsPageExames(false)
            setIsPageDashBoard(true)
            setIsRelatorio(false)
            setModalIsOpenRelatorio(false)
            if (localStorage.getItem('BcD#p%swmmE6e%dR9UJK^kqBi@JMtf27')) {
                navigate('/home/Dasboard')
            } else {
                navigate('/home/usuario/Dasboard')
            }
        }
        if (n === 5) {
            setIsPage(false)
            setIsPageHome(false)
            setIsPageExames(false)
            setIsPageDashBoard(false)
            setModalIsOpenRelatorio(!modalIsOpenRelatorio)
            setIsRelatorio(true)
            setIsPage(true)
            if (localStorage.getItem('BcD#p%swmmE6e%dR9UJK^kqBi@JMtf27')) {
                navigate('/home/cadastro')
            } else {
                navigate('/home/usuario')
            }
        }
    }

    return (
        <nav className='sidebar-main'>
            <div className='sidebar-div'>
                {localStorage.getItem('BcD#p%swmmE6e%dR9UJK^kqBi@JMtf27') && (
                    <button onClick={() => selectButton(1)} style={{ backgroundColor: `${isPageHome ? "#fff" : "#000"}` }} className='sidebar-button'>
                        <HomeIcon sx={{ color: `${isPageHome ? "blue" : "#fff"}`, width: '80%', height: '40px' }} />
                        <h1 style={{ color: `${isPageHome ? "#052747" : "#fff"}` }}>Home</h1>
                    </button>
                )}
                <button onClick={() => selectButton(2)} style={{ backgroundColor: `${isPage ? "#fff" : "#000"}` }} className='sidebar-button'>
                    <PolylineIcon sx={{ color: `${isPage ? "#052747" : "#fff"}`, width: '80%', height: '40px' }} />
                    <h1 style={{ color: `${isPage ? "#052747" : "#fff"}` }}>Cadastro</h1>
                </button>
                <button onClick={() => selectButton(3)} style={{ backgroundColor: `${isPageExames ? "#fff" : "#000"}` }} className='sidebar-button'>
                    <TextSnippetIcon sx={{ color: `${isPageExames ? "#052747" : "#fff"}`, width: '80%', height: '40px' }} />
                    <h1 style={{ color: `${isPageExames ? "#052747" : "#fff"}` }}>Exames</h1>
                </button>
                <button onClick={() => selectButton(4)} style={{ backgroundColor: `${isPageDashBoard ? "#fff" : "#000"}` }} className='sidebar-button'>
                    <LeaderboardIcon sx={{ color: `${isPageDashBoard ? "#052747" : "#fff"}`, width: '80%', height: '40px' }} />
                    <h1 style={{ color: `${isPageDashBoard ? "#052747" : "#fff"}` }}>DashBoard</h1>
                </button>
                <button onClick={() => selectButton(5)} style={{ backgroundColor: `${isRelatorio ? "#fff" : "#000"}` }} className='sidebar-button'>
                    <AssessmentIcon  sx={{ color: `${isRelatorio? "#052747" : "#fff"}`, width: '80%', height: '40px' }} />
                    <h1 style={{ color: `${isRelatorio ? "#052747" : "#fff"}` }}>Relatório</h1>
                </button>
            </div>
        </nav>
    )
}