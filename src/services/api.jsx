import axios from "axios";

const API_URL = "http://localhost:5001/api/menu";

export const fetchMenu = () => axios.get(API_URL);
export const addMenuItem = (data) => axios.post(API_URL, data, { headers: { "Content-Type": "multipart/form-data" } });
export const updateMenuItem = (id, data) => axios.put(`${API_URL}/${id}`, data, { headers: { "Content-Type": "multipart/form-data" } });
export const deleteMenuItem = (id) => axios.delete(`${API_URL}/${id}`);
