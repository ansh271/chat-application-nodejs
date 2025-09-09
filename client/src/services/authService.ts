import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

export const login = async (email: string, password: string) => {
  const res = await axios.post(`${API_URL}/login`, { email, password });
  localStorage.setItem("token", res.data.token);
  return res.data;
};

export const signup = async (username: string, email: string, password: string) => {
  const res = await axios.post(`${API_URL}/signup`, { username, email, password });
  return res.data;
};

export const getToken = () => localStorage.getItem("token");
