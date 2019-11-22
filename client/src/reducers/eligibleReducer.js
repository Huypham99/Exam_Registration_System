const eligibleReducer = (state = false, action) => {
    switch (action.type) {
        case 'SET_ELIGIBLE':
            return state = action.payload
        default:
            return state
    }
}
export default eligibleReducer