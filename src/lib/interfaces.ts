export interface PostInterface {
    _id: string;
    email: string;
    name: string;
    date: string;
    time: string;
    text: string;
    profile_img_link: string;
    comments: CommentInterface[];
}

export interface CommentInterface {
    _id: string;
    email: string;
    name: string;
    date: string;
    time: string;
    text: string;
    profile_img_link: string;
}

export interface CommentArray {
    comments: [];
}

export interface PostIDInterface {
    _id: string,
}

export interface Friend {
    name: string,
    email: string,
    profile_img_link: string,
}

// export interface ChatWindowContextInterface {
//     chat_id: string,
//     name: string,
//     email: string,
    
// }