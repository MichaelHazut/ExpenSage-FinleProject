import { Router } from '../../router/Router';
import './AppBody.css'
import { SignUpPage } from './SignUp_Page/SignUpPage';

export function AppBody(props) {
    return (
        <div className="appBody">
            <Router
            props={props}  />
        </div>
    )
}