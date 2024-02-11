import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface UserState {
    email: string,
    firstName: string,
    lastName: string,
}

const initialState: UserState = {
    email: "",
    firstName: "",
    lastName: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        //is actually counter/increment for name
        setGlobalUser: (state, action: PayloadAction<UserState>) => { //can also take action. I.E. (state, action)
            return state = action.payload;
        },
    },
});

export const {setGlobalUser} = userSlice.actions;

export default userSlice.reducer;