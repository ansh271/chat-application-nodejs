import axios from "axios";
import { getToken } from "./authService";

const API_URL = "http://localhost:8080/api/messages";

export const sendMessage = async (receiverId: string, message: string) => {
  const token = getToken();
  const res = await axios.post(API_URL, { receiverId, message }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const getMessages = async (userId: string) => {
  const token = getToken();
  const res = await axios.get(`${API_URL}/${userId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

