import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    type: null,
    id: null
}

export const counterSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, {payload}) => {
            localStorage.removeItem('userType')
            localStorage.setItem('userType',payload.type)
            localStorage.setItem('uId', payload.id)
            state.id = payload.id
            state.type = payload.type
        },
    },
})

// Action creators are generated for each case reducer function
export const { setUser } = counterSlice.actions

export default counterSlice.reducer