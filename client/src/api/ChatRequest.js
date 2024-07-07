import axios from 'axios';
const API = axios.create({baseURL: 'https://krish-media.onrender.com'})

export const userChats = (id)=> API.get(`/chat/${id}`)