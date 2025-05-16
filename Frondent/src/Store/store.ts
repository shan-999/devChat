import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authSlice from './slice/auth'
import chatSlice from './slice/chatSlice'
import activeChatSlice from './slice/activeChat' 



const appReducer = combineReducers({
    auth: authSlice,
    chat: chatSlice,
    activeChat: activeChatSlice
})


const rootReducer = (state: ReturnType<typeof appReducer> | undefined, action: any) => {
    
  if (action.type === 'RESET_STORE') {
    console.log('kkkk');
    
    state = undefined; 
  }
  return appReducer(state, action);
};

const presistConfige = {
    key: 'root',
    storage
}

const presistedReducer = persistReducer(presistConfige, rootReducer )

export const store = configureStore({
    reducer: presistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);