//this page is for testing purposes only
//it will be a mess that is my vow
import React, { useState, useEffect, useRef } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Collapse from 'react-bootstrap/Collapse';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

import User from '../Models/UserClass';
import Expense from '../Models/ExpenseModel';
import useFetch from '../Hooks/useFetch';
import usePostFetch from '../Hooks/usePostFetch';
import { getUser } from '../DAL/UserHandler';
import apiUrls from '../Data/ApiUrls';

export function TestPage({ loggedUser }) {
  const [optionVisability, setOptionVisability] = useState(true);
  const showOptions = () => setOptionVisability(!optionVisability)

  const [requestOptions, setRequestOptions] = useState(null);
  const [userData, setUserData] = useState(null);
  const { data, isLoading, error } = useFetch(apiUrls.getExpenses + 1, {});
  console.log(data);
  var date = useRef();
  const navigate = useNavigate();


  const handleCreation = () => {
    const userProps = {
      name: 'TestUser',
      email: 'TestUserEmail@gmail.com',
      password: '!Aa123456',
    };
    const myUser = new User(userProps);

    setRequestOptions({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(myUser.state),
    });
  };

  const handleNavigation = () => {
    navigate('/login');
  }


  const handleGetUser = () => {
    const data = getUser('Michael1mic1@gmail.com', '!aa123456');
    console.log('Handler');
    console.log(data);
  }

  const handlePostUser = () => {
    const userProps = {
      name: 'Test Page User',
      email: 'testPageV3.1@email.com',
      password: 'Password'
    }

    const newUser = new User(userProps);
    console.log(newUser);
    console.log(newUser.state);

    setUserData(newUser.state);
  }

  const handlePostexpense = async () => {
    console.log(loggedUser);
    const expenseProps = {
      user: loggedUser,
      category: 'Girldfriend',
      title: '2nd weird Json Post API Request',
      currency: 'ILS',
      price: 420,
      date: '2021-08-01'
    }
    const expense = new Expense(expenseProps);
    console.log('Current expense: ', expense.state);
    const respons = await fetch('https://localhost:7077/api/expenses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(expense.state),
    });
    console.log(respons);
  }

  useEffect(() => {
    console.log(date.current.value);
  }, [date]);



  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  if (error) {
    return <button onClick={handlePostUser}>Post User</button>
  }




  return (
    <div>
      <button onClick={handleCreation}>Create User</button>
      <button onClick={handleNavigation}>Navigate</button>
      <button onClick={handleGetUser}>Get User</button>
      <button onClick={handlePostUser}>Post User</button>
      <button onClick={handlePostexpense}>Post expense</button>

      <h1 onClick={showOptions} >List of Users</h1>
      <Collapse in={optionVisability}>
        <div>
          {data &&
            data.map((user, index) => (
              <div key={index}>
                {/* Replace the properties below with the actual properties of your User objects */}
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <hr />
              </div>
            ))}
        </div>
      </Collapse>
      <Container id='signUpContainer'>
        <h2>Login</h2>
        <Form >
          <Form.Group className="mb-3" controlId='Date'>
            <Form.Control ref={date} type='date' placeholder='Date' />
          </Form.Group>
        </Form>
      </Container>
    </div>
  );
}



