import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "@/types/types";
import api from "@/api/axiosInstense";

export interface AthSlice {
    user: null | User
    isLogin: boolean
}

const initialState: AthSlice = {
    user: null,
    isLogin: false
}

export const checkTocken = createAsyncThunk('/checkTocken',
    async (_, { rejectWithValue }) => {
        try {
            const tockenExpiry = await api.get('/checkTocken')
            return tockenExpiry.data.user

        } catch (error:any) {
            return rejectWithValue(error.response?.data?.message || 'Something went wrong')
        }
    }
)


const authSlice = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
        setLoginState(state, action: PayloadAction<User>) {
            state.isLogin = true
            state.user = action.payload
        },
        setLogoutState(state) {
            state.isLogin = false,
                state.user = null
        }
    },
    extraReducers: (bulider) => {
        bulider

            .addCase(checkTocken.pending, (state) => {
                state.isLogin = false,
                    state.user = null
            })

            .addCase(checkTocken.rejected, (state) => {
                state.isLogin = false,
                    state.user = null
            })

            .addCase(checkTocken.fulfilled, (state, action) => {
                state.isLogin = true,
                    state.user = action.payload
            })
    }
})


export const { setLoginState, setLogoutState } = authSlice.actions
export default authSlice.reducer