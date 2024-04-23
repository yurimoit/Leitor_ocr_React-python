import { Route, Routes, Outlet, Navigate } from 'react-router-dom';
import App from './Login/App';
import SignUp from './SignUp';
import AppHome from './Home';
import { useState } from 'react';

export default function RoutesPag() {

    const [
        // eslint-disable-next-line
        verificacao, setVerificacao] = useState(false)

    function ProtectedRoutes({ redirectTo }) {

        const isAuthenticated = localStorage.getItem('E%H6%2&6GB8UU!UZ3XncHd');//Troca depois para autorize
        const isAuthenticatedDT = localStorage.getItem('BcD#p%swmmE6e%dR9UJK^kqBi@JMtf27') ? localStorage.getItem('BcD#p%swmmE6e%dR9UJK^kqBi@JMtf27') : false;

        return (isAuthenticated && isAuthenticatedDT) ? <Outlet /> : <Navigate to={redirectTo} />
    }

    function ProtectedRoutesUsuario({ redirectTo }) {

        const isAuthenticated = localStorage.getItem('E%H6%2&6GB8UU!UZ3XncHd');
        const isAuthenticatedDT = localStorage.getItem('BcD#p%swmmE6e%dR9UJK^kqBi@JMtf27') ? localStorage.getItem('BcD#p%swmmE6e%dR9UJK^kqBi@JMtf27') : false;//Troca depois para autorize

        return (isAuthenticated && !isAuthenticatedDT) ? <Outlet /> : <Navigate to={redirectTo} />
    }

    return (
        <Routes>
            <Route path='/' element={<App setVerificacao={setVerificacao} />} />
            <Route path='/cadastrar' element={<SignUp />} />
            <Route element={<ProtectedRoutes redirectTo="/" />}>
                <Route path='/home' element={<AppHome />} />
                <Route path='/home/cadastro' element={<AppHome verificacao={true} />} />
                <Route path='/home/listaExame' element={<AppHome verificacao={true} listaExame={true} />} />
                <Route path='/home/Dasboard' element={<AppHome verificacao={true} Dasboard={true} />} />
            </Route>

            <Route element={<ProtectedRoutesUsuario redirectTo="/" />}>
                <Route path='/home/usuario' element={<AppHome verificacao={true} />} />
                <Route path='/home/usuario/listaExame' element={<AppHome verificacao={true} listaExame={true} />} />
                <Route path='/home/usuario/Dasboard' element={<AppHome verificacao={true} Dasboard={true} />} />
            </Route>
        </Routes>
    );
}