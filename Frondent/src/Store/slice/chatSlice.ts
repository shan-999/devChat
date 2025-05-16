import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatMessage } from '@/types/types';

interface ChatState {
    messages: ChatMessage[],
    reciverId: string,
    userId: string
}

const initialState: ChatState = {
    messages: [],
    reciverId: '',
    userId: ''
};


const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<ChatMessage>) => {
            state.messages.push(action.payload)
        },
        setReciverSocketId: (state, action: PayloadAction<string>) => {
            state.reciverId = action.payload
        },
        setUserSocketId: (state, action: PayloadAction<string>) => {
            state.userId = action.payload
        }
    }
})


export const { addMessage, setReciverSocketId, setUserSocketId } = chatSlice.actions
export default chatSlice.reducer
