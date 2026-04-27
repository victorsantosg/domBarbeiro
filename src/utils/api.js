import axios from 'axios'; 

const API_URL = 'http://localhost:3001/api';

export const getServices = () => axios.get(`${API_URL}/services`).then(res => res.data);
export const getBarbers = () => axios.get(`${API_URL}/barbers`).then(res => res.data);
export const getProducts = () => axios.get(`${API_URL}/products`).then(res => res.data);
export const getAppointments = () => axios.get(`${API_URL}/appointments`).then(res => res.data);
export const createAppointment = (data) => axios.post(`${API_URL}/appointments`, data).then(res => res.data);
export const updateAppointmentStatus = (id, status) => axios.patch(`${API_URL}/appointments/${id}`, { status }).then(res => res.data);
