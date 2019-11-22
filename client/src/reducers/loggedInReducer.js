const loggedInReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_LOGIN':
            return state = action.payload
        default:
            return state
    }
}
export default loggedInReducer