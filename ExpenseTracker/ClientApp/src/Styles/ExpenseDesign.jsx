import { Box, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';



export const BoxContainer = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(1),
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[2],
}));

export const GridContainer = styled(Grid)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '1fr 4fr 1fr 1fr',
    padding: theme.spacing(1),
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: '1fr',
    },
}));

export const RowContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
}));

export const BreakText = styled(Typography)(({ theme }) => ({
    wordBreak: 'break-word',
    padding: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
    },
}));

export const Category = styled(BreakText)(({ theme }) => ({
    minWidth: 100,
    textAlign: 'center',
}));

export const Description = styled(BreakText)(({ theme }) => ({
    gridColumn: '1 / span 4',
    padding: theme.spacing(1),
}));