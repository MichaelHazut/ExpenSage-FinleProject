import React, { useState, useEffect } from 'react';
import { Typography, Button, Grid, Box, Container, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();
    const [navBarHeight, setNavBarHeight] = useState(0);

    useEffect(() => {
      const navBar = document.getElementById('my-navbar');
      if (navBar) {
        setNavBarHeight(navBar.offsetHeight);
      }
    }, []);

    const handleStartTracking = () => {
        navigate('/signup');
    }
    return (
        <Container id="my-container" sx={{ px: 0, '@media (min-width: 600px)': { padding: '0' }}} maxWidth="xl">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: '100vw',
                }}
            >
                <Box
                    sx={{
                        className: 'Welcome',
                        background: 'linear-gradient(to bottom, #4CAF50, #8BC34A, #C5E1A5, #FFFFFF)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        minHeight: `calc(100vh - ${navBarHeight}px)`,
                        minWidth: '100vw',
                        justifyContent: 'center',
                        pl: '3rem',
                        pr: '2rem',

                    }}
                >
                    <Typography variant="h6" gutterBottom sx={{ fontFamily: "'Ubuntu','sans-serif'" }}>
                        Stay on Top of Your Finances
                    </Typography>
                    <Typography variant="h2" gutterBottom sx={{ fontFamily: "'Nunito','sans-serif'" }}>
                        Welcome to Your Personal Expense Tracker
                    </Typography>
                    <Typography variant="h5" gutterBottom sx={{ fontFamily: "'Ubuntu','sans-serif'" }}>
                        Track your expenses and manage your finances in one place
                    </Typography>
                    <Button variant="contained" color="primary" style={{ marginTop: '1rem' }} onClick={handleStartTracking}>
                        Start Tracking Now
                    </Button>
                </Box>

                <Box>


                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            mt: 4,
                            ml: '2rem',
                            pl: 3,
                            borderLeft: '6px solid #8BC34A',
                        }}
                    >
                        <Typography variant="h6" sx={{ fontFamily: "'Ubuntu','sans-serif'", color: '#4CAF50' }}>
                            Keep track of your expenses and manage your budget effectively.
                        </Typography>
                        <Typography variant="h6" sx={{ fontFamily: "'Ubuntu','sans-serif'", color: '#4CAF50' }}>
                            Gain control over your finances.
                        </Typography>
                    </Box>





                    <Grid container spacing={3} mt={4} sx={{ alignItems: 'stretch', justifyContent: 'center', px: 3 }}>
                        {Array.from(Array(3).keys()).map((index) => (
                            <Grid key={index} item xs={12} sm={6} md={4} sx={{ mb: { xs: 2, md: 0 } }}>
                                <Box sx={{ display: 'flex', height: '100%' }}>
                                    <Card sx={{ boxShadow: 2, borderRadius: '8px', backgroundColor: '#E8F5E9', p: 3, width: '100%' }}>
                                        <CardContent sx={{ flex: 1 }}>
                                            <Typography variant="h6" gutterBottom sx={{ fontFamily: "'Ubuntu','sans-serif'", color: '#4CAF50' }}>
                                                {index === 0 ? 'Track Your Expenses' : index === 1 ? 'Set Your Budget' : 'Get Insights'}
                                            </Typography>
                                            <Typography variant="body1" gutterBottom sx={{ fontFamily: "'Nunito','sans-serif'" }}>
                                                {index === 0
                                                    ? 'Keep track of your expenses and stay within your budget with our easy-to-use expense tracker.'
                                                    : index === 1
                                                        ? 'Set a budget and track your progress with our budgeting tools.'
                                                        : 'Get insights into your spending habits and make informed decisions about your finances.'}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>

                    <Box sx={{ minHeight: "6rem" }}></Box>
                </Box>
            </Box>
        </Container>
    );
};

export default HomePage;

