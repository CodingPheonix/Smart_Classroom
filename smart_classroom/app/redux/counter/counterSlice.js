"use client"
import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        // value: 0,
        text: ''
    },
    reducers: {
        // increment: state => {
        //     // Redux Toolkit allows us to write "mutating" logic in reducers. It
        //     // doesn't actually mutate the state because it uses the Immer library,
        //     // which detects changes to a "draft state" and produces a brand new
        //     // immutable state based off those changes
        //     state.value += 1
        // },
        // decrement: state => {
        //     state.value -= 1
        // },
        // incrementByAmount: (state, action) => {
        //     state.value += action.payload
        // },
        setText: (state, action) => {
            state.text = action.payload; // New reducer to set the string value
        },
        clearText: state => {
            state.text = ''; // Optional: A reducer to clear the string
        }
    }
})

// Action creators are generated for each case reducer function
export const { setText, clearText } = counterSlice.actions

export default counterSlice.reducer