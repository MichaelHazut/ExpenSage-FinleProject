import HomeIcon from '@mui/icons-material/Home';
import MoneyIcon from '@mui/icons-material/AttachMoney';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import SignUpIcon from '@mui/icons-material/PersonAdd';
import AboutIcon from '@mui/icons-material/Info';

const home = { name: 'Home', icon: <HomeIcon/>};
const myExpenses = { name: 'Expenses', icon: <MoneyIcon/>};
const login = { name: 'Login', icon: <LoginIcon/>};
const logout = { name: 'Logout', icon: <LogoutIcon/>};
const signUp = { name: 'Sign Up', icon: <SignUpIcon />};
const about = { name: 'About', icon: <AboutIcon/>};


export const urlRouter = [home, about, login, logout, signUp]
export const loggedIn = [home, myExpenses, about, logout]
export const notLoggedIn = [home,  login, signUp, about]