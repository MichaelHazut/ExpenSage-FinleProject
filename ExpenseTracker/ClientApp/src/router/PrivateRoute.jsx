import { Route, Navigate } from "react-router-dom";
import myRoutes from "./RouterModel";


const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) => {
    return (
      <Route {...rest} element={isAuthenticated ? <Component /> : <Navigate to={myRoutes.LOGIN} />} />
    );
  };
  
  export default PrivateRoute;