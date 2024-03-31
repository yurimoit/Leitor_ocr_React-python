import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import './styles.css'

export default function AnimationsPerfil() {
    return (
        <Box sx={{ width: '100%', height: '100%' }}>
            <Skeleton sx={{ marginBottom: '15px', backgroundColor: 'rgb(33, 118, 214)', height: '45px' }} />
            <Skeleton sx={{ marginBottom: '15px', backgroundColor: 'rgb(33, 118, 214)', height: '25px' }} animation="wave" />
            <Skeleton sx={{ marginBottom: '15px', backgroundColor: 'rgb(33, 118, 214)', height: '25px' }} animation={false} />
        </Box>
    );
}
