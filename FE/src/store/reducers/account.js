const initialState = {
    username: "",
    token: "",
    isLogin: false
}

export default function account(state=initialState, action) {
    switch (action.type) {
        case 'LOGIN':
            return {
                username: action.username,
                token: action.token,
                isLogin: true
            }
        case 'LOGOUT':
            return {
                username: "",
                token: "",
                isLogin: false
            }
        default:
            return state;
    }
}
