//this page is for testing purposes only
//it will be a mess that is my vow
import { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useFetchPost } from "../Hooks/useFetchPost";
import apiUrls from "../Data/ApiUrls";

export function TestPage({ loggedUser }) {
  const [users, setUsers] = useState([]);
  // const { response, error, isLoading, postFetch } = useFetchPost('https://localhost:7077/api/users', loggedUser);
  const { postResponse, error, isLoading, postFetch } = useFetchPost(apiUrls.postCategory);

  useEffect(() => {
    console.log('useEffect: ', postResponse);
    if (postResponse) {
      console.log(postResponse);
    }
    if (error) {
      console.log(error);
    }
  }, [postResponse, error, isLoading]);
  
  const GetUsers = () => {
    postFetch().then((res) => {
      setUsers(res);
    });
  };

  const setCategory = () => {
    console.log("Set category");
    postFetch({name:'myTest'});
  }
  return (
    <Box sx={{ background: 'white', display:'flex', flexDirection:'column', justifyContent:'center', m: 5}}>
      <Button variant='outlined' onClick={() => console.log(loggedUser)}>log user</Button>
      <Button variant='outlined' onClick={setCategory}>Set new category</Button>
      
      {(users.map((user) => (
        <Typography>{user}</Typography>
      )))}
    </Box>
  );
}



