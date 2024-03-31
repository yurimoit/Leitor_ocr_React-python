import './styles.css'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

export default function EditarSair({ setIsOpen, setStatusWindows }) {
    const navgate = useNavigate()

    function abrirModal() {
        setIsOpen(true)
        setStatusWindows(false)
    }

    function logouUsuario() {
        localStorage.removeItem('token')
        navgate('/')
    }

    return (
        <div className='button-editarSair'>
            <button onClick={() => abrirModal(true)} style={{ borderRight: '1px solid rgba(128, 128, 128, 0.842)', borderRadius: '8px 0 0 8px' }}>
                <ModeEditIcon />
            </button>
            <button onClick={() => logouUsuario()} style={{ borderRadius: '0 8px 8px 0' }}>
                <LogoutIcon />
            </button>
        </div>
    );
}