import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface UserState {
    email: string,
    firstName: string,
    lastName: string,
    name: string,
    role: string,
    friends: string[],
    loggedIn: boolean,
    visiting: string,
    profile_img_link: string,
    settings: {
        theme: string,
        profile_visibility: string,
        show_posts: string,
        show_major: string,
        show_location: string,
    }
}

const initialState: UserState = {
    email: "",
    firstName: "",
    lastName: "",
    name: "",
    role: "",
    friends: [],
    loggedIn: false,
    visiting: "",
    profile_img_link: "",
    settings: {
        theme: "",
        profile_visibility: "",
        show_posts: "",
        show_major: "",
        show_location: "",
    }
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        //is actually counter/increment for name
        setGlobalUser: (state, action: PayloadAction<UserState>) => { //can also take action. I.E. (state, action)
            return state = {...action.payload, loggedIn: true};
        },
        updateGlobalUser: (state, action: PayloadAction<UserState>) => {
            return state = {...action.payload}
        },
    },
});

export const {setGlobalUser, updateGlobalUser} = userSlice.actions;

export default userSlice.reducer;