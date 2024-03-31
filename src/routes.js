import { Route, Routes, Outlet, Navigate } from 'react-router-dom';
import App from './Login/App';
import SignUp from './SignUp';
import AppHome from './Home';
import { useState } from 'react';

export default function RoutesPag() {

    const [verificacao, setVerificacao] = useState(false)

    function ProtectedRoutes({ redirectTo }) {

        const isAuthenticated = localStorage.getItem('token');//Troca depois para autorize

        return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />
    }

    return (
        <Routes>
            <Route path='/' element={<App setVerificacao={setVerificacao} />} />
            <Route path='/cadastrar' element={<SignUp />} />
            <Route element={<ProtectedRoutes redirectTo="/" />}>
                <Route path='/home' element={<AppHome />} />
                <Route path='/home/cadastro' element={<AppHome />} />
            </Route>
        </Routes>
    );
}