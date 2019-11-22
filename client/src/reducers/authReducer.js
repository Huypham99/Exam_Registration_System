const authReducer = (state = false, action) => {
    switch (action.type) {
        case 'SET_AUTHED':
            return state = action.payload
        default:
            return state
    }
}
export default authReducer