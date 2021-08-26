import axios from 'axios';

export const baseURL = 'http://localhost:8000/api';

const api = axios.create({
	baseURL,
});

export default api;
