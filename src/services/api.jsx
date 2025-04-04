import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const API_URL = `${BACKEND_URL}api/menu`;

export const fetchMenu = () => axios.get(API_URL);
export const addMenuItem = (data) => axios.post(API_URL, data, { headers: { "Content-Type": "multipart/form-data" } });
export const updateMenuItem = (id, data) => axios.put(`${API_URL}/${id}`, data, { headers: { "Content-Type": "multipart/form-data" } });
export const deleteMenuItem = (id) => axios.delete(`${API_URL}/${id}`);
