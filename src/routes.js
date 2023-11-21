import { Route, Routes, Outlet, Navigate } from 'react-router-dom';
import App from './Login/App';
import SignUp from './SignUp';
import Home from './Home';

export default function RoutesPag() {

    function ProtectedRoutes({ redirectTo }) {

        const isAuthenticated = true;//Troca depois para autorize

        return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />
    }

    return (
        <Routes>
            <Route path='/' element={<App />} />
            <Route path='/cadastrar' element={<SignUp />} />
            <Route element={<ProtectedRoutes redirectTo="/" />}>
                <Route path='/home' element={<Home />} />
            </Route>
        </Routes>
    );
}