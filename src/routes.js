import { Route, Routes } from 'react-router-dom';
import App from './Home/App';

export default function RoutesPag() {
    return (
        <Routes>
            <Route path='/' element={<App />} />
        </Routes>
    );
}