
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import apiUrls from '../../../Data/ApiUrls';
import { ToasterSuccess, ToasterWarn } from '../../Toaster';
import { useFetchPost } from '../../../Hooks/useFetchPost';
import { FormControlLabel, Switch, Box, TextField, Typography, Container, Button, CircularProgress, alpha } from '@mui/material';

export function LoginPage({ setIsAuthenticated, setLoggedUser }) {

    const navigate = useNavigate();
    var email = useRef();
    var password = useRef();

    const [showPassword, setShowPassword] = useState(false);

    const [userData, setUserData] = useState(null);
    const { postResponse, postError, isLoading: postIsLoading, postFetch } = useFetchPost(apiUrls.postUserLogin);

    function handlePasswordVisibilityChange(event) {
        setShowPassword(event.target.checked);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setUserData({
            email: email.current.value,
            password: password.current.value
        })
    }

    useEffect(() => {
        if (userData) {
            postFetch(userData);
        }
    }, [userData]);

    useEffect(() => {
        if (postResponse) {
            setIsAuthenticated(true);
            setLoggedUser(postResponse)
            ToasterSuccess('Logged In Successfully');
            navigate('/expenses');
        }
    }, [postResponse]);

    useEffect(() => {
        if (postError) {
            ToasterWarn(postError);
        }
    }, [postError]);


    return (
        <Box id="loginPage"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'red',
                minHeight: '90dvh',
                background: 'linear-gradient(to bottom, #4CAF50, #8BC34A, #C5E1A5, #FFFFFF)',
            }}>
            <Container maxWidth='sm' >
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    maxWidth: 1000,
                    width: '100%',
                    p: 4,
                    my: 5,
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: 2
                }}>
                    {postIsLoading ? (
                        <Box sx={{ display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center', height: '100%', py: 3 }}>
                            <Typography variant='h4' sx={{ mb: 2, color: alpha('#000000', 0.5) }}>Signing You In</Typography>
                            <CircularProgress color='primary' size={120} thickness={4.5} sx={{ my: 3 }}></CircularProgress>
                        </Box>) : (
                        <>
                            <Typography variant='h3' sx={{ alignSelf: 'start' }}>Login</Typography>
                            <TextField variant="outlined" size="small" inputRef={email} type="email" label="Email" sx={{ width: '100%', mt: 2 }} />
                            <TextField variant="outlined" size="small" inputRef={password} type={showPassword ? 'text' : 'password'} label="Password" sx={{ width: '100%', mt: 2 }} />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={showPassword}
                                        onChange={handlePasswordVisibilityChange}
                                    />
                                }
                                label={showPassword ? 'Hide password' : 'Show password'}
                                labelPlacement="start"
                                sx={{ alignSelf: 'end', }}
                            />
                            <Button variant="contained" onClick={(e) => handleSubmit(e)} sx={{ alignSelf: 'start', mt: 2 }}>Login</Button>
                        </>
                    )
                    }
                </Box>
            </Container >
        </Box >
    )
}