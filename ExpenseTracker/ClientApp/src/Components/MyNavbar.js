import { useState } from 'react';
import { useMediaQuery, AppBar, Toolbar, IconButton, Button, Container, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { styled } from '@mui/system';

import MenuIcon from '@mui/icons-material/Menu';

const LogoContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(2),
}));

const LogoText = styled('span')(({ theme }) => ({
    fontWeight: 'bold',
    fontSize: '1.5rem',
    marginLeft: theme.spacing(1),
    lineHeight: '1.2',
}));

const CustomDrawer = styled(Drawer)(({ theme }) => ({
    '& .MuiPaper-root': {
        background: 'linear-gradient(to bottom, #4CAF50, #8BC34A, #C5E1A5, #FFFFFF)',
        boxShadow: theme.shadows[6],
        width: '240px', // Adjust the width as needed
    },
}));

const CustomDrawerList = styled(List)(({ theme }) => ({
    color: theme.palette.primary.contrastText,
}));

const CustomDrawerListItem = styled(ListItem)(({ theme }) => ({
    '&:hover': {
        backgroundColor: theme.palette.primary.light,
    },
    paddingRight: '16px', // Add padding to the right of the navigation options
}));

const CustomDrawerListItemText = styled(ListItemText)(({ theme }) => ({
    fontWeight: 'bold',
}));



export function MyNavbar({ navOptions }) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const isMobileScreen = useMediaQuery('(max-width: 600px)');

    const toggleDrawer = (open) => () => {
        setIsDrawerOpen(open);
    };


    return (
        <AppBar id="my-navbar" position="static" color="primary" sx={{minWidth:"100%"}}>
            <Toolbar>
                {isMobileScreen && (
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                )}

                <LogoContainer>
                    <LogoText>ExpenSage</LogoText>
                </LogoContainer>

                {isMobileScreen ? (
                    <CustomDrawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
                        <CustomDrawerList>
                            {navOptions.map((nav, index) => (
                                <CustomDrawerListItem
                                    key={index}
                                    button
                                    component="a"
                                    href={nav.name.replace(/\s+/g, '').toLowerCase()}
                                    onClick={toggleDrawer(false)}
                                >
                                    {nav.icon}
                                    <CustomDrawerListItemText primary={nav.name} sx={{ ml: 2 }} />
                                </CustomDrawerListItem>
                            ))}
                        </CustomDrawerList>
                    </CustomDrawer>
                ) : (
                    <Container id="container">
                        {navOptions.map((nav, index) => (
                            <Button
                                key={index}
                                className="nav-link"
                                color="inherit"
                                href={nav.name.replace(/\s+/g, '').toLowerCase()}
                                sx={{ fontWeight: 'bold', mt: 1 }}
                            >
                                {nav.name}
                            </Button>
                        ))}
                    </Container>
                )}
            </Toolbar>
        </AppBar>
    );
}