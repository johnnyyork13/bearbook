import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface UserState {
    email: string,
    firstName: string,
    lastName: string,
    name: string,
    friends: [],
    loggedIn: boolean,
    visiting: string,
    profile_img_link: string,
}

const initialState: UserState = {
    email: "",
    firstName: "",
    lastName: "",
    name: "",
    friends: [],
    loggedIn: false,
    visiting: "",
    profile_img_link: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        //is actually counter/increment for name
        setGlobalUser: (state, action: PayloadAction<UserState>) => { //can also take action. I.E. (state, action)
            return state = {...action.payload, loggedIn: true};
        },
        setVisiting: (state, action: PayloadAction<UserState>) => {
            return state = {...action.payload}
        }
    },
});

export const {setGlobalUser, setVisiting} = userSlice.actions;

export default userSlice.reducer;