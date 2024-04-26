import axios from 'axios';

export default axios.create({
    baseURL: 'https://giant-fox-undershirt.cyclic.app',
    timeout: 30000,
    headers: { 'Content-Type': 'application/json' }
});