import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import EditarSair from '../EditarSair';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './styles.css'
import AlignVerticalBottomIcon from '@mui/icons-material/AlignVerticalBottom';
// import InsightsIcon from '@mui/icons-material/Insights';
// import SsidChartIcon from '@mui/icons-material/SsidChart';
// import TimelineIcon from '@mui/icons-material/Timeline';

export default function Header({ statusWindows, setStatusWindows, modalIsOpen, setIsOpen, usuario }) {

    return (
        <header>
            <div className='home-header-title'>
                <AlignVerticalBottomIcon sx={{ color: '#fff', width: '70px', height: '45px' }} />
                <h1>Analise Laboratorial</h1>
            </div>
            <div className='home-header-perfil'>
                <Stack direction="row" spacing={2}>
                    <Avatar alt={usuario[1][0] ? usuario[1][0].toUpperCase() : "N"} src="/static/images/avatar/1.jpg" />
                </Stack>
                <h1>{usuario[1] ? usuario[1][0].toUpperCase() + usuario[1].slice(1) : "Nome"}</h1>
                <button onClick={() => setStatusWindows(!statusWindows)}>
                    {!statusWindows ? <ExpandMoreIcon sx={{ width: '100%', height: '100%', color: '#fff' }} /> : <ExpandLessIcon sx={{ width: '100%', height: '100%', color: '#fff' }} />}
                </button>
                {statusWindows && <div className='EditarSair'>
                    <EditarSair
                        setIsOpen={setIsOpen}
                        setStatusWindows={setStatusWindows}
                    />
                </div>}
            </div>
        </header>
    )
}