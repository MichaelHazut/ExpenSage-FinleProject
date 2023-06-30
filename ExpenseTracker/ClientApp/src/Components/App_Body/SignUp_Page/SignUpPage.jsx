
import { FormControlLabel, Switch, Box, TextField, Typography, Container, Button, CircularProgress, alpha } from '@mui/material';

import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './SignUpPage.css'
import User from '../../../Models/UserClass';
import { ToasterSuccess, ToasterWarn } from '../../Toaster';
import { CheckUserInput } from '../../../Helpers/UsersHandler/UserInputCheck';
import { useFetchPost } from '../../../Hooks/useFetchPost';
import apiUrls from '../../../Data/ApiUrls';



export function SignUpPage({ setLoggedUser, setIsAuthenticated, loggedUser }) {

  const email = useRef();
  const password = useRef();
  const name = useRef();

  const [userData, setUserData] = useState(null);
  const { postResponse, postIsLoading, postFetch } = useFetchPost(apiUrls.registerUser);

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      postFetch(userData);
    }
  }, [userData]);

  useEffect(() => {
    if (postResponse) {
      setLoggedUser(postResponse);
      setIsAuthenticated(true);
      ToasterSuccess('Registered Successfully')
      navigate('/expenses');
    }
  }, [postResponse]);

  function handlePasswordVisibilityChange(event) {
    setShowPassword(event.target.checked);
  }

  const ButtonSubmit = async (e) => {
    const userProps = {
      name: name.current.value,
      email: email.current.value,
      password: password.current.value
    }
    const response = CheckUserInput(userProps.email, userProps.password, userProps.name)
    if (response !== true) {
      ToasterWarn(response);
      return;
    }
    const newUser = new User(userProps);
    setUserData(newUser.state);
  }



  return (
    <Box id="signUpPage"
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
          {postIsLoading ? (<>
            <Typography variant='h4' sx={{ mb: 2, color: alpha('#000000', 0.5) }}>Signing You In</Typography>
            <CircularProgress color='primary' size={120} thickness={4.5} sx={{ my: 3 }}></CircularProgress>
          </>
          ) : (

            <>
              <Typography variant='h3' sx={{ alignSelf: 'start' }}>Sign Up</Typography>
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
              <TextField variant="outlined" size="small" inputRef={name} type="text" label="Name" sx={{ width: '100%' }} />
              <Button variant="contained" onClick={(e) => ButtonSubmit(e)} sx={{ alignSelf: 'start', mt: 2 }}>Sign Up</Button>
            </>
          )}
        </Box>
      </Container >
    </Box >
  )
}