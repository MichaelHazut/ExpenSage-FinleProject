//this page is for testing purposes only
//it will be a mess that is my vow
import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Collapse from 'react-bootstrap/Collapse';

import User from '../Models/UserClass';
import Expense from '../Models/ExpenseModel';
import useFetch from '../Hooks/useFetch';
import usePostFetch from '../Hooks/usePostFetch';
import { getUser } from '../DAL/UserHandler';

export function TestPage() {
  const [optionVisability, setOptionVisability] = useState(true);
  const showOptions = () => setOptionVisability(!optionVisability)

  const [requestOptions, setRequestOptions] = useState(null);
  //const { data, error, isLoading } = useFetch('https://localhost:7077/api/users/get-users', requestOptions);
  const [userData, setUserData] = useState(null);
  const { data, error, isLoading } = usePostFetch('https://localhost:7077/api/users', userData);

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

    // fetch('https://localhost:7077/api/users', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(newUser.state),
    // })
    //   .then((response) => {
    //     if (!response.ok) {
    //       return response.text().then((text) => {
    //         throw new Error(text);
    //       });
    //     }
    //     return response.json();
    //   }
    //   )
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((error) => {
    //     console.error('There has been a problem with your post operation:', error);
    //   });



  //const myUser = new User(userProps)
  //const { data, error, isLoading } = useFetch('https://localhost:7077/api/users');

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <button onClick={handlePostUser}>Post User</button>
  }

  // const [users, setUsers] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await fetch('https://localhost:7077/api/users');
  //       const data = await response.json();
  //       setUsers(data);
  //       setLoading(false);
  //     } catch (err) {
  //       setError(err.message);
  //       setLoading(false);
  //     }
  //   };
  //   fetchUsers();
  // }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }


  //User Testing



  //Expenses Testing
  // const expenseProps = {
  //   id:1,
  //   user:myUser,
  //   category:'Testing',
  //   title:'1st Test Expense Model',
  //   currency:"$",
  //   price:69,
  //   date:'2023-04-08',
  // }
  // const expense = new Expense(expenseProps)

  // const expenseProps2 = {
  //   id:2,
  //   user:myUser,
  //   category:'Testing',
  //   title:'2st Test Expense Model',
  //   currency:"$",
  //   price:420,
  //   date:'2023-04-08',
  // }
  // const expense2 = new Expense(expenseProps)
  // myUser.addExpense(expense);
  // myUser.addExpense(expense2);
  // console.log('New User State After adding expense \n',myUser);




  return (
    <div>
      {/* <User name='Michael Hazut'
        email='Michael1mic1@gmail.com'
        password='!Aa123456'
        id='69'>  </User> */}
      <button onClick={handleCreation}>Create User</button>
      <button onClick={handleNavigation}>Navigate</button>
      <button onClick={handleGetUser}>Get User</button>
      <button onClick={handlePostUser}>Post User</button>

      <h1 onClick={showOptions} >List of Users</h1>
      <Collapse in={optionVisability}>
        <div>
          {data.map((user, index) => (
            <div key={index}>
              {/* Replace the properties below with the actual properties of your User objects */}
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <hr />
            </div>
          ))}
        </div>
      </Collapse>
    </div>
  );
}



