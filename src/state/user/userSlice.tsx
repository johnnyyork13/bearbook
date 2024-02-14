import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface UserState {
    email: string,
    firstName: string,
    lastName: string,
    friends: [],
    loggedIn: boolean,
}

const initialState: UserState = {
    email: "",
    firstName: "",
    lastName: "",
    friends: [],
    loggedIn: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        //is actually counter/increment for name
        setGlobalUser: (state, action: PayloadAction<UserState>) => { //can also take action. I.E. (state, action)
            return state = {...action.payload, loggedIn: true};
        },
    },
});

export const {setGlobalUser} = userSlice.actions;

export default userSlice.reducer;