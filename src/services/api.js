import axios from 'axios';

export default axios.create({
    baseURL: 'https://api-ocr-b76fcb7b34b7.herokuapp.com',
    timeout: 30000,
    headers: { 'Content-Type': 'application/json' }
});