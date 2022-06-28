export const login = (username, token) => {
    return {
        type: "LOGIN",
        username: username,
        token: token
    }
}

export const logout = () => {
    return {
        type: "LOGOUT"
    }
}
