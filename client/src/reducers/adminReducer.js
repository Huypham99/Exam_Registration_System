const adminReducer = (state = false, action) => {
    switch (action.type) {
        case 'SET_ADMIN':
            return state = action.payload
        default:
            return state
    }
}
export default adminReducer