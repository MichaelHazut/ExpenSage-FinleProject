import { useNavigate  } from 'react-router-dom';

export function UserLoggin(setUserLogin){
    setUserLogin(true);
}

export function UserLogout({setIsAuthenticated}){
    const navigate = useNavigate();
    setIsAuthenticated(false);
    navigate('/home');
    
    return (<></>)
}
