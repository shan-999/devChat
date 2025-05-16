import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '@/types/types';

interface ActiveChatState {
  activeChat: User | null;
  activateSerch:boolean
}

const initialState: ActiveChatState = {
  activeChat: null,
  activateSerch:false
};

const activeChatSlice = createSlice({
  name: 'activeChat',
  initialState,
  reducers: {
    setActiveChat(state, action: PayloadAction<User>) {
      state.activeChat = action.payload;
    },
    clearActiveChat(state) {
      state.activeChat = null;
    },
    setActivateSerch(state,action:PayloadAction<boolean>){
      state.activateSerch = action.payload
    }
  },
});



export const { setActiveChat, clearActiveChat, setActivateSerch } = activeChatSlice.actions;

export default activeChatSlice.reducer;