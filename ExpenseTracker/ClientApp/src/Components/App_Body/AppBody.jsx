import { Box } from '@mui/material';
import { Router } from '../../router/Router';

export function AppBody(props) {
    return (
        <Box id='body' sx={{justifyContent:'center'}}>
            <Router
            props={props}  />
        </Box>
    )
}