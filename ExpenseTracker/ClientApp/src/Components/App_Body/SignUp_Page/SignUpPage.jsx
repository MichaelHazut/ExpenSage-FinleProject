import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './SignUpPage.css'
import User from '../../../Models/UserClass';
import createUser from '../../../DAL/UserHandler';
import { ToasterSuccess, ToasterWarn } from '../../Toaster';
import { CheckUserInput } from '../../../Helpers/UsersHandler/UserInputCheck';
import usePostFetch from '../../../Hooks/usePostFetch';

export function SignUpPage({ setLoggedUser, setIsAuthenticated, loggedUser }) {

    const email = useRef();
    const password = useRef();
    const name = useRef();
  
    const [userData, setUserData] = useState(null);
    const [triggerFetch, setTriggerFetch] = useState(null);
    const { data, error, isLoading } = usePostFetch('https://localhost:7077/api/users', userData, triggerFetch);
  
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
  
    useEffect(() => {
      if (data) {
        setLoggedUser(data);
        setIsAuthenticated(true);
        setTriggerFetch(false);
        ToasterSuccess('Registered Successfully');
      }
    }, [data]);
  
    useEffect(() => {
      loggedUser && navigate('/myexpenses');
    }, [loggedUser]);
  
    function handlePasswordVisibilityChange(event) {
      setShowPassword(event.target.checked);
    }
  
    const CheckInput = async (e) => {
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
      try {
        setUserData(newUser.state);
        setTriggerFetch(true);
      }
      catch (err) {
        console.error('Failed to create user:', err.message);
      }
    }



    return (
        <div className='signUpPage'>
            <Container id='signUpContainer'>
                <h2>Sign Up</h2>
                <Form >
                    <Form.Group className="mb-3" controlId='formEmail'>
                        <Form.Label>Email Adress</Form.Label>
                        <Form.Control ref={email} type='email' placeholder='Enter Email'></Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId='formPassword'>
                        <div className="d-flex align-items-center">
                            <Form.Label className="flex-grow-1">Password</Form.Label>
                            <Form.Check
                                type='switch'
                                label={showPassword ? 'Hide password' : 'Show password'}
                                onChange={handlePasswordVisibilityChange}
                            />
                        </div>
                        <Form.Control ref={password} type={showPassword ? 'text' : 'password'} placeholder='Password'></Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId='formName'>
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control ref={name} type='text' placeholder='Enter Full Name'></Form.Control>
                    </Form.Group>
                    <Button variant='dark' id='submitButton' onClick={(e) => CheckInput(e)}>Sign Up</Button>
                </Form>
            </Container>
        </div>

    )
}