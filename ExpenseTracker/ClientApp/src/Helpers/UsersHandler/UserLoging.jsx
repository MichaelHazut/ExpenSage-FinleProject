import { useNavigate  } from 'react-router-dom';

export function UserLoggin(setUserLogin){
    setUserLogin(true);
}

export function UserLogout({setIsAuthenticated , setLoggedUser}){
    const navigate = useNavigate();
    setIsAuthenticated(false);
    setLoggedUser(null);
    navigate('/home');
    
    return (<></>)
}