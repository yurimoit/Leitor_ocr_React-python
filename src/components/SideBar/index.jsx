import './styles.css'
import HomeIcon from '@mui/icons-material/Home';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import PolylineIcon from '@mui/icons-material/Polyline';
import { useNavigate } from 'react-router-dom';


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
}) {

    const navigate = useNavigate()

    function selectButton(n) {
        if (n === 1) {
            navigate('/home')
            setIsVerificacao(false)
            setIsPage(false)
            setIsPageHome(true)
            setIsPageExames(false)
            setIsPageDashBoard(false)
        }
        if (n === 2) {
            setIsPage(true)
            setIsPageHome(false)
            setIsPageExames(false)
            setIsPageDashBoard(false)
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
            if (localStorage.getItem('BcD#p%swmmE6e%dR9UJK^kqBi@JMtf27')) {
                navigate('/home/Dasboard')
            } else {
                navigate('/home/usuario/Dasboard')
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
            </div>
        </nav>
    )
}