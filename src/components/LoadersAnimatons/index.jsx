import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function Animations() {
    return (
        <Box sx={{ width: '100%', height: '100%' }}>
            <Skeleton sx={{ marginBottom: '15px' }} />
            <Skeleton sx={{ marginBottom: '15px' }} animation="wave" />
            <Skeleton sx={{ marginBottom: '15px' }} animation={false} />
            <Skeleton sx={{ marginBottom: '15px' }} />
            <Skeleton sx={{ marginBottom: '15px' }} animation="wave" />
            <Skeleton sx={{ marginBottom: '15px' }} animation={false} />
            <Skeleton sx={{ marginBottom: '15px' }} />
            <Skeleton sx={{ marginBottom: '15px' }} animation="wave" />
            <Skeleton sx={{ marginBottom: '15px' }} animation={false} />
            <Skeleton sx={{ marginBottom: '15px' }} />
            <Skeleton sx={{ marginBottom: '15px' }} animation="wave" />
            <Skeleton sx={{ marginBottom: '15px' }} animation={false} />
            <Skeleton sx={{ marginBottom: '15px' }} />
            <Skeleton sx={{ marginBottom: '15px' }} animation="wave" />
            <Skeleton sx={{ marginBottom: '15px' }} animation={false} />
            <Skeleton sx={{ marginBottom: '15px' }} />
            <Skeleton sx={{ marginBottom: '15px' }} animation="wave" />
            <Skeleton sx={{ marginBottom: '15px' }} animation={false} />
        </Box>
    );
}
