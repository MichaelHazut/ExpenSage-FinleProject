import { Route, Routes } from 'react-router-dom';
import  HomePage  from '../Components/App_Body/HomePage_Page/HomePage';
import { SignUpPage } from '../Components/App_Body/SignUp_Page/SignUpPage';
import { LoginPage } from '../Components/App_Body/Login_Page/LoginPage';
import ExpensesPage  from '../Components/App_Body/Expenses_Page/ExpensesPage';
import { UserLogout } from '../Helpers/UsersHandler/UserLoging';
import { TestPage } from '../Tests/TestPage';
import myRoutes from './RouterModel';


export function Router({ props }) {
    return (
        <Routes>
            <Route path={myRoutes.HOME} element={<HomePage />} />
            <Route path={myRoutes.SIGNUP} element={<SignUpPage {...props} />} />
            <Route path={myRoutes.LOGIN} element={<LoginPage {...props} />} />
            <Route path={myRoutes.LOGOUT} element={<UserLogout {...props} />} />
            {props.isAuthenticated ?
                <Route path={myRoutes.EXPENSES} element={<ExpensesPage loggedUser={props.loggedUser} />} /> :
                <Route path={myRoutes.EXPENSES} element={<LoginPage {...props} />} />}
            <Route path="*" element={<HomePage />} />
        </Routes>
    );
};


