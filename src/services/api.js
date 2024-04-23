import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:5000',
    timeout: 30000,
    headers: { 'Content-Type': 'application/json' }
});