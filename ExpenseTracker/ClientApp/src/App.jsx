import { MyNavbar } from "./Components/MyNavbar";
import { notLoggedIn, loggedIn } from './Data/nav-options-data'
import { AppBody } from "./Components/App_Body/AppBody";
import { ToastContainer } from "react-toastify";
import { useSessionStorage } from "./Helpers/SessionHandler/useSessionStorage";
import { useInactivityTimeout } from "./Helpers/SessionHandler/useInactivityTimeout";
import { useState } from "react";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useSessionStorage('isAuthenticated', false);
    const [loggedUser, setLoggedUser] = useState(null);
    useInactivityTimeout(20, () => {
        setIsAuthenticated(false);
    });

    return (
        <div className="App">
            <ToastContainer position='bottom-right' />
            <MyNavbar navOptions={isAuthenticated ? loggedIn : notLoggedIn}></MyNavbar>
            <AppBody
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
                loggedUser={loggedUser}
                setLoggedUser={setLoggedUser}>
            </AppBody>
        </div>
    );
}

export default App;
