import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

import { useRef, useState } from 'react';
import { useNavigate  } from 'react-router-dom';

import './LoginPage.css'
import { ToasterSuccess, ToasterWarn } from '../../Toaster';
import { UserLoggin } from '../../../Helpers/UsersHandler/UserLoging';
import { checkIfUserExist } from '../../../Helpers/UsersHandler/CheckIfExist';

export function LoginPage({setIsAuthenticated}) {
    var email = useRef();
    var password = useRef();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    function handlePasswordVisibilityChange(event) {
        setShowPassword(event.target.checked);
    }

    function handleSubmit(e) {
        const response = checkIfUserExist(email.current.value)
        if (response !== true) {
            ToasterWarn("User Not Found");
            return;
        }
        UserLoggin(setIsAuthenticated);
        ToasterSuccess('Login Successful');
        navigate('/myExpenses');

    }
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