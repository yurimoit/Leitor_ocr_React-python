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
        localStorage.removeItem('E%H6%2&6GB8UU!UZ3XncHd')
        localStorage.removeItem('BcD#p%swmmE6e%dR9UJK^kqBi@JMtf27')
        localStorage.removeItem('SMoYgVd$Q6Qf2#g@fG5XTgH')
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