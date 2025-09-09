import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


interface Message {
  sender: string;
  receiver: string;
  message: string;
  createdAt?: string;
}

interface ChatState {
  user: { id: string; username: string } | null;
  receiverId: string | null;
  messages: Message[];
}

const initialState: ChatState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null,
  receiverId: null,
  messages: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setReceiver: (state, action: PayloadAction<string>) => {
      state.receiverId = action.payload;
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
    },
    setUser: (state, action: PayloadAction<{ id: string; username: string }>) => {
      state.user = action.payload;
    },
  },
});

export const { setReceiver, addMessage, setMessages, setUser } = chatSlice.actions;
export default chatSlice.reducer;
