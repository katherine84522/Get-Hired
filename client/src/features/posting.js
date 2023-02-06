import { createSlice } from "@reduxjs/toolkit"


export const postingSlice = createSlice({
    name: "posting", //name of state
    initialState: { value: { job_title: "", company: "", link: "", location: "", js: false, python: false, ruby: false, react: false } },
    reducers: {
        changeValue: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { changeValue } = postingSlice.actions;
export default postingSlice.reducer;