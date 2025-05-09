import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authSlice from './slice/auth'
import chatSlice from './slice/chatSlice'



const rootReducers = combineReducers({
    auth: authSlice,
    chat: chatSlice
})

const presistConfige = {
    key: 'root',
    storage
}

const presistedReducer = persistReducer(presistConfige, rootReducers)

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