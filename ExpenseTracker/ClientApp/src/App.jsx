import { MyNavbar } from "./Components/MyNavbar";
import { Footer } from "./Components/Footer";
import { notLoggedIn, loggedIn } from './Data/nav-options-data'
import { AppBody } from "./Components/App_Body/AppBody";
import { ToastContainer } from "react-toastify";
import { useSessionStorage } from "./Helpers/SessionHandler/useSessionStorage";
import { useInactivityTimeout } from "./Helpers/SessionHandler/useInactivityTimeout";

import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    primary: {
      main: '#4CAF50',
    },
    secondary: {
      main: '#8BC34A',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F5F5F5',
    },
    text: {
      primary: '#212121',
    },
  },
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useSessionStorage('isAuthenticated', false);
  const [loggedUser, setLoggedUser] = useSessionStorage('loggedUser', null);
  useInactivityTimeout(30, () => {
    setIsAuthenticated(false);
    setLoggedUser(null);
  });

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position='bottom-right' />
      <MyNavbar navOptions={isAuthenticated ? loggedIn  : notLoggedIn}></MyNavbar>
      <AppBody
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        loggedUser={loggedUser}
        setLoggedUser={setLoggedUser}>
      </AppBody>
      <Footer/>
    </ThemeProvider>
  );
}

export default App;
