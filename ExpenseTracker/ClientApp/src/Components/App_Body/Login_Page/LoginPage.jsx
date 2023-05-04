import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './LoginPage.css'
import { ToasterSuccess, ToasterWarn } from '../../Toaster';
import { UserLoggin } from '../../../Helpers/UsersHandler/UserLoging';
import { checkIfUserExist } from '../../../Helpers/UsersHandler/CheckIfExist';
import usePostFetch from '../../../Hooks/usePostFetch';

export function LoginPage({ setIsAuthenticated, setLoggedUser }) {

    const navigate = useNavigate();
    var email = useRef();
    var password = useRef();

    const [showPassword, setShowPassword] = useState(false);

    const [triggerFetch, setTriggerFetch] = useState(false);
    const [userData, setUserData] = useState(null);
    const { data, error} = usePostFetch('https://localhost:7077/api/users/login', userData, triggerFetch);

    function handlePasswordVisibilityChange(event) {
        setShowPassword(event.target.checked);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setUserData({
            email: email.current.value,
            password: password.current.value
        })
        setTriggerFetch(true);
        navigate('/myExpenses');
    }
    useEffect(() => {
        if (data) {
            setIsAuthenticated(true);
            setLoggedUser(data.user);
            setTriggerFetch(false);
            ToasterSuccess('Logged In Successfully');
        }
    }, [data]);
    useEffect(() => {
        if(error){
            ToasterWarn(error);
        }
    }, [error]);
    
    return (
        <div className='LoginPage'>

            <Container id='signUpContainer'>
                <h2>Login</h2>
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

                    <Button variant='dark' id='submitButton' onClick={(e) => handleSubmit(e)}>login</Button>
                </Form>
            </Container>
        </div>
    )
}