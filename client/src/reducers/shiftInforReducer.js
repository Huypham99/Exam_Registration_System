const initialState = {
    shiftId: null,
};

export default function userInfor(state = initialState, action) {
    switch (action.type) {
        case 'SET_SHIFT_ID':
            return {
                shiftId: action.shiftId,
            }
        default:
            return state;
    }
}